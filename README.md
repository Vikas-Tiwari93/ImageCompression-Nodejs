
# ImageCompression-Nodejs.

it will automatically run on port 5000.
must setup Env for tinypng is being used. only need a key.


two APIs for image compression.
1. <h2>image compression when upload</h2>
    <p> POST image as FormData with key as "newImage" on http://localhost:5000/image//upload/compress
     it will primarily save as webp</p>
3.<h2> image compression from know directory path by selecting only images in a directory.</h2>
    <p> GET on http://localhost:5000/image/manual/compress?extension=
     ( at last after " = ", you can give webp/avif/heif extention to which you want it to be converted )
     </p>

