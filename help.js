
module.exports.exists = async function (path) {  
	try {
		    await fs.access(path)
		    return true
		  
	} catch {
		    return false
		  
	}
	
}
