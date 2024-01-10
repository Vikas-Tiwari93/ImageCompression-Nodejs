
# ImageCompression-Nodejs.

it will automatically run on port 5000.
must setup Env for tinypng is being used. only need a key.

<h1>Two APIs for image compression for mobile, tablet and desktop use. three types of compression .</h1>

 <h2> 1. image compression when upload</h2>
    <p> POST image as FormData with key as "newImage" on http://localhost:5000/image/upload/compress
     it will primarily save as webp</p>
     <h2> 2. image compression from know directory path by selecting only images in a directory.</h2>
    <p> Start the server, it will create all directories, now needed and fill the uncompressed directory with images to be compressed. Then make
     GET request on http://localhost:5000/image/manual/compress?extension=
     ( at last after " = ", you can give webp/avif/heif extention to which you want it to be converted ).
     now check the folders named desktop, mobile and tablet.
     </p>

