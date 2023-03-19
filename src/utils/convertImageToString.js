export default async function convertImageToString (imageList) {
    const imagePromise = new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const {result} = e.target
            if (result) {
                resolve(result)
            }
        }

        fileReader.readAsDataURL(imageList[0]);
    })
    return imagePromise
}