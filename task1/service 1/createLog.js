

const createLog = async (plu, storeId, action) => {
    const data = {};

    try {
        logBody = {
            plu: plu,
            storeId: storeId,
            action: action
        };

        const response = await fetch('http://localhost:3001/createLog', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body : JSON.stringify(logBody)
        });
        
        if (response.status == 200) {
            data.response = "log created";
        } else { throw new Error("Logger error") }

    } catch (err) { data.error = err; }

    return data;
}

module.exports = createLog;
