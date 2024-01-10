# Codewise-backend

it will automatically run on port 5000.
must setup Env for tinypng is being used. only need a key.


two APIs for image compression.
1. image compression when upload
     POST image as FormData with key as "newImage" on http://localhost:5000/image//upload/compress
     it will primarily save as webp
3. image compression from know directory path by selecting only images in a directory.
     GET on http://localhost:5000/image/manual/compress?extension=
     ( at last after " = ", you can give webp/avif/heif extention to which you want it to be converted )

# ImageCompression-Nodejs.
