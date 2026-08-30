import path from "path";
// console.log(path.extname("abc.txt"))
// console.log(path.dirname("./parent/child/abc.txt"))
// console.log(path.dirname("abc.txt"))
// console.log(path.join("parentfolder","subfolder","abc.pdf"))
// console.log(path.normalize("../parent/vikas/akash/../abc.txt"))
// console.log(path.isAbsolute("./files/abc.txt"));

/*
=====================================================================
 NOTES: Topic covered in this file -> Node.js "path" module
=====================================================================
 The path module helps build and parse file/folder paths in a safe,
 cross-platform way (handles "/" vs "\" for you).

 Methods practiced here:
   - path.extname("abc.txt")
        -> returns the file extension  => ".txt"

   - path.dirname("./parent/child/abc.txt")
        -> returns the directory part  => "./parent/child"
        (for just "abc.txt" it returns "." meaning current directory)

   - path.join("parentfolder","subfolder","abc.pdf")
        -> joins segments with the correct separator
        => "parentfolder/subfolder/abc.pdf"

   - path.normalize("../parent/vikas/akash/../abc.txt")
        -> cleans up ".." and "." segments
        => "../parent/vikas/abc.txt"

   - path.isAbsolute("./files/abc.txt")
        -> true if path is absolute, false if relative  => false

 Why it matters: manually joining strings with "/" breaks across OSes
 and mishandles "..". The path module does this correctly for us.
=====================================================================
*/
