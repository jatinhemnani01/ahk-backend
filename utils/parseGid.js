function parseGid(url) {
  let id = "";
  let parts = url.split(
    /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
  );
  if (url.indexOf("?id=") >= 0) {
    id = parts[6].split("=")[1].replace("&usp", "");
    return id;
  } else {
    id = parts[5].split("/");
    //Using sort to get the id as it is the longest element.
    let sortArr = id.sort(function (a, b) {
      return b.length - a.length;
    });
    id = sortArr[0];
    return id;
  }
}

module.exports={parseGid};
