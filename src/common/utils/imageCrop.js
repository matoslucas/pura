export function cropShopifyImage(url, size = 290) {

  if(!url){
    return
  }
  
  if (url.indexOf('.jpg') !== -1) {
    const urlArr = url.split('.jpg')
    urlArr.splice(1, 0, `_${size}x${size}_cropped.jpg`)
    return urlArr.join('')
  }

  if (url.indexOf('.png') !== -1) {
    const urlArr = url.split('.png')
    urlArr.splice(1, 0, `_${size}x${size}_cropped.png`)
    return urlArr.join('')
  }

  return url
}
