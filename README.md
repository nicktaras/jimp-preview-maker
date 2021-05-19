# jimp

## Example repository to generate the AutographNFT

### Dev

1. run `node index.js`
2. check the image `out.png`

## Font Installation

https://www.npmjs.com/package/jimp: supports basic typography using BMFont format (.fnt).

https://stackoverflow.com/questions/24529369/how-to-convert-ttf-to-fnt-with-fontforge

Steps to convert a Googlefont to .fnt

1. Goto Google Fonts and download a chosen font to disk
2. Unzip the file
3. Download font forge
4. Open font forge
5. Within the application:
6. Go to Element -> Bitmap Strikes Available.
7. Select the 'Win' button
8. Under 'Point Sizes' enter the size (or sizes) you want.
9. Tick 'Use FreeType' and 'Create Rasterized Strikes' Click OK.
10. You should now have a bitmap strike to work with. Go to Generate Fonts; on the left side select 'No Outline Font', 
11. and on the right side select Windows FNT, pick the size you want, and generate.

FNT is a bitmap format while TTF is an outline/vector format. To get FNT output, you'll first need to create a bitmap strike or strikes. Fontforge can do this if it has been built with Freetype included:

## From working with Jimp for a day:

Jimp looks like a great tool for creating simplistic designs as flat images. It is most likely a very powerful tool when you have understood the workflows needed to create custom designs - however, I feel this tool requires some time to learn to be able to use it to create pixel perfect designs. 

Observations:

- The API can rotate the whole image but it seems that you cannot rotate a text single element. 
- The developer must select the specific font size of the font they wish to import, which is slightly cumbersome to the development process.
- This tool lacks the features that you can use out of the box with CSS e.g. blur effect (which is used in the current design)

Please see the documentation within the NPM package below:

https://www.npmjs.com/package/jimp#writing-text
