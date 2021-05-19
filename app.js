const Jimp = require('jimp');
const fs = require('fs');

// 1. Position Text 
// 2. ...

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
      // "https://github.com/nicktaras/json_mocks/raw/main/BebasNeue-Regular-24.fnt"
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
    .rotate( 0, false )
    .print(font, 65, image.bitmap.height - 75, `${data.name}.${data.twitterId}`)
    .rotate( 0, false )
    .print(font, 165, image.bitmap.height - 75, "Shamrock")
    .rotate( 90, false )
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
  // "https://lh3.googleusercontent.com/JLEcKv8aYGxzBDAX_7rCuQcJFwHhwMs9u4SB68zpeDJuEP8m-s_IaXSyd5dSTq_TYhKh6Tf9BoqRYOY29QYTqo9wPa18v-B-IQxU=s0",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png",
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