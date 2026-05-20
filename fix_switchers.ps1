$files = Get-ChildItem -Path 'b:\f-work\DMA-CC\templates\variants' -Recurse -Filter 'base.html'
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $pattern2 = [regex]::Escape("<a href=""{% url 'v2' %}""")
    $pattern7 = [regex]::Escape("<a href=""{% url 'v7' %}""")
    # Remove the full anchor tag for v2
    $content = [regex]::Replace($content, [regex]::Escape("<a href=""{% url 'v2' %}"" title=""Editorial"">2</a>"), '')
    $content = [regex]::Replace($content, [regex]::Escape("<a href=""{% url 'v2' %}"" class=""cur"" title=""Editorial"">2</a>"), '')
    $content = [regex]::Replace($content, [regex]::Escape("<a href=""{% url 'v7' %}"" title=""V7 Cybernetic System"">7</a>"), '')
    $content = [regex]::Replace($content, [regex]::Escape("<a href=""{% url 'v7' %}"" title=""V7 Cybernetic System"" data-cursor=""VARIANT 7"">7</a>"), '')
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.FullName)"
}
Write-Host "Done!"
