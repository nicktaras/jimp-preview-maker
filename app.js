const Jimp = require('jimp');
const fs = require('fs');

// [{
//   title
//   photoURL
//   name
//   twitterId
//   mark
// }]

const generateImage = async (
  imageUrl,
  data,
  base64Encode = true
  ) => 
{
  const [image, font, photo] = await Promise.all([
    Jimp.read(imageUrl),
    Jimp.loadFont(
      'https://unpkg.com/jimp@0.16.1/fonts/open-sans/open-sans-16-white/open-sans-16-white.fnt'
    ),
    Jimp.read(data.photoURL),
  ]);

  const imageMime = image.getMIME();
  const resultImage = image
    .print(font, 15, image.bitmap.height - 120, data.title)
    .composite(
      photo.circle({
        radius: photo.bitmap.width / 2,
        x: photo.bitmap.width / 2,
        y: photo.bitmap.height / 2,
      }),
      15,
      image.bitmap.height - 90
    )
    .print(font, 65, image.bitmap.height - 75, `${data.name}.${data.twitterId}`)
    .pixelate(1, -200, 0, 200, 200)
    .print(
      font,
      image.bitmap.width - 200,
      0,
      {
        text: 'NOT SIGNED',
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      },
      200,
      100
    )
    .print(
      font,
      image.bitmap.width - 200,
      120,
      {
        text: 'ONGOING OFFER',
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
      },
      200,
      100
    ).write('/logo.png', () => {
      console.log('done')
    });

  if (base64Encode) {
    return {
      stream: await resultImage.getBase64Async(imageMime),
      mimeType: imageMime,
    };
  } else {
    return {
      stream: await resultImage.getBufferAsync(imageMime),
      mimeType: imageMime,
    };
  }
}

generateImage(
  "https://ethereum.org/static/c3bcc8c47890ffd2a2c329972c73d0fd/31987/ethereum-logo-portrait-black-gray.png",
  {
    title: "Hello Ethereum",
    photoURL: "https://pbs.twimg.com/profile_images/1196498439304929281/c87NCmb0_400x400.jpg",
    name: "Nick",
    twitterId: "@Nick",
    mark: "12354"  
  }
).then((res) => {
  var base64Data = res.stream.replace(/^data:image\/png;base64,/, "");
  fs.writeFile("out.png", base64Data, 'base64', function(err) {
    console.log(err);
  });
});