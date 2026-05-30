const errorHandler = {
    notFound : (req, res) => {
        const errorCode = 404
        const errorType = "Not Found"
        const errorMessage = "Halaman yang sedang anda cari tidak ada atau sudah dipindahkan"
        return res.status(errorCode).render('error', {errorCode, errorType, errorMessage})
    },
    internalServerError : (req, res) => {
        const errorCode = 500
        const errorType = "Internal Server Error"
        const errorMessage = "Server sedang mengalami masalah. Ini bukan karena perangkat anda"
        return res.status(errorCode).render('error', {errorCode, errorType, errorMessage})
    }
}

module.exports = errorHandler