# jimp

## Example repository to generate a desired image output.

### Dev

1. run `node index.js`
2. check the image `out.png`

## Font Installation - Steps to convert a Googlefont to .fnt

1. Go to Google Fonts and download a chosen font to disk
2. Unzip the file
3. Download fontForge
4. Open fontForge
5. Within the application:
6. Go to Element -> Bitmap Strikes Available.
7. Select the 'Win' button
8. Under 'Point Sizes' enter the size (or sizes) you want.
9. Tick 'Use FreeType' and 'Create Rasterized Strikes' Click OK.
10. You should now have a bitmap strike to work with. Go to Generate Fonts; on the left side select 'No Outline Font', 
11. and on the right side select Windows FNT, pick the size you want, and generate.

FNT is a bitmap format while TTF is an outline/vector format. To get FNT output, you'll first need to create a bitmap strike or strikes. Fontforge can do this if it has been built with Freetype included:

## Learnings:

Jimp looks like a great tool for creating simplistic designs as flat images. It is most likely a very powerful tool when you have understood the workflows needed to create custom designs.

- The API can rotate the whole image but it seems that you cannot rotate a text single element. Perhaps multiple images should be made and stitched together?
- The developer must select the specific font size of the font they wish to import (this takes some time and can be error prone from using fontForge)
- The API is small and is missing some of the features you utilise with SVG, CSS, HTML. 

NPM Package: https://www.npmjs.com/package/jimp
