$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class FastBackgroundRemover {
    public static void Process(string srcPath, string dstPath, int maxWidth = 0) {
        using (Bitmap rawSrc = new Bitmap(srcPath)) {
            Bitmap src = rawSrc;
            bool resized = false;
            if (maxWidth > 0 && rawSrc.Width > maxWidth) {
                int newH = (int)((float)rawSrc.Height * ((float)maxWidth / (float)rawSrc.Width));
                src = new Bitmap(maxWidth, newH, PixelFormat.Format32bppArgb);
                using (Graphics g = Graphics.FromImage(src)) {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.DrawImage(rawSrc, 0, 0, maxWidth, newH);
                }
                resized = true;
            }

            int w = src.Width;
            int h = src.Height;
            using (Bitmap dst = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
                BitmapData srcData = src.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData dstData = dst.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                
                int bytes = Math.Abs(srcData.Stride) * h;
                byte[] rgbValues = new byte[bytes];
                byte[] outValues = new byte[bytes];
                
                Marshal.Copy(srcData.Scan0, rgbValues, 0, bytes);
                Array.Copy(rgbValues, outValues, bytes);
                
                bool[,] isBg = new bool[w, h];
                bool[,] visited = new bool[w, h];
                System.Collections.Generic.Queue<Point> q = new System.Collections.Generic.Queue<Point>();
                
                // Seed borders
                for (int x = 0; x < w; x++) {
                    q.Enqueue(new Point(x, 0)); visited[x, 0] = true;
                    q.Enqueue(new Point(x, h - 1)); visited[x, h - 1] = true;
                }
                for (int y = 0; y < h; y++) {
                    q.Enqueue(new Point(0, y)); visited[0, y] = true;
                    q.Enqueue(new Point(w - 1, y)); visited[w - 1, y] = true;
                }
                
                while (q.Count > 0) {
                    Point p = q.Dequeue();
                    int idx = (p.Y * srcData.Stride) + (p.X * 4);
                    byte b = rgbValues[idx];
                    byte g = rgbValues[idx + 1];
                    byte r = rgbValues[idx + 2];
                    
                    bool neutral = Math.Abs(r - g) < 24 && Math.Abs(g - b) < 24 && Math.Abs(r - b) < 24;
                    bool bright = r > 160 && g > 155 && b > 150;
                    
                    if (neutral && bright) {
                        isBg[p.X, p.Y] = true;
                        
                        int[] dx = { 1, -1, 0, 0 };
                        int[] dy = { 0, 0, 1, -1 };
                        for (int i = 0; i < 4; i++) {
                            int nx = p.X + dx[i];
                            int ny = p.Y + dy[i];
                            if (nx >= 0 && nx < w && ny >= 0 && ny < h && !visited[nx, ny]) {
                                visited[nx, ny] = true;
                                q.Enqueue(new Point(nx, ny));
                            }
                        }
                    }
                }
                
                for (int y = 0; y < h; y++) {
                    for (int x = 0; x < w; x++) {
                        int idx = (y * dstData.Stride) + (x * 4);
                        if (isBg[x, y]) {
                            outValues[idx + 3] = 0; // Transparent
                        } else {
                            bool nearBg = false;
                            for (int dy = -1; dy <= 1; dy++) {
                                for (int dx = -1; dx <= 1; dx++) {
                                    int nx = x + dx; int ny = y + dy;
                                    if (nx >= 0 && nx < w && ny >= 0 && ny < h && isBg[nx, ny]) {
                                        nearBg = true; break;
                                    }
                                }
                                if (nearBg) break;
                            }
                            if (nearBg) {
                                byte b = rgbValues[idx]; byte g = rgbValues[idx + 1]; byte r = rgbValues[idx + 2];
                                if (r > 150 && g > 145 && b > 140) {
                                    outValues[idx + 3] = (byte)Math.Max(0, 255 - ((r + g + b) / 3));
                                }
                            }
                        }
                    }
                }
                
                Marshal.Copy(outValues, 0, dstData.Scan0, bytes);
                src.UnlockBits(srcData);
                dst.UnlockBits(dstData);
                dst.Save(dstPath, ImageFormat.Png);
            }
            if (resized) { src.Dispose(); }
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

New-Item -ItemType Directory -Force -Path "public\frames\lg" | Out-Null
New-Item -ItemType Directory -Force -Path "public\frames\sm" | Out-Null

$img = [System.Drawing.Image]::FromFile("public\assets\character.gif")
$fd = New-Object System.Drawing.Imaging.FrameDimension($img.FrameDimensionsList[0])
$count = $img.GetFrameCount($fd)
Write-Host "Extracting and removing background for $count frames..."

$tempRaw = "public\frames\temp_raw.png"

for ($i = 0; $i -lt $count; $i++) {
    $img.SelectActiveFrame($fd, $i)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $bmp.Save($tempRaw, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    
    $lgOut = "public\frames\lg\frame_" + $i.ToString('D3') + ".png"
    $smOut = "public\frames\sm\frame_" + $i.ToString('D3') + ".png"
    
    # Process desktop frame (full res)
    [FastBackgroundRemover]::Process($tempRaw, $lgOut, 0)
    
    # Process mobile frame (downscaled to 360px)
    [FastBackgroundRemover]::Process($tempRaw, $smOut, 360)
    
    if ($i % 20 -eq 0) {
        Write-Host "Processed frame $i of $count"
    }
}

if (Test-Path $tempRaw) { Remove-Item $tempRaw -Force }
$img.Dispose()

Write-Host "SUCCESS: Extracted and cleaned all $count frames in lg and sm sets!"
