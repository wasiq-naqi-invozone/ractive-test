const localstorage = (name) => {
    
    function getAll(){
        const items = JSON.parse(localStorage.getItem(name))
        return items ?? []
    }

    function update(index, body){
        
        const items = JSON.parse(localStorage.getItem(name))

        // body.id = id;
        // const itemIndex = items.findIndex(e => e.id == id);

        items[index] = body;
        localStorage.setItem(name, JSON.stringify(items));

        return body;

    }

    return {
        getAll,
        update,
    }

}

export default localstorage