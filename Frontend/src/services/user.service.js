const endpoint = "http://localhost:3000/users"

export async function getUsers() {
    try{
        const response = await fetch(endpoint);
        if(!response.ok) throw new Error("Error fetching users");
        return await response.json();
    } catch (e){
        console.error(e);
        return [];
    }
}

export async function registerUser(user) {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Error registering user");
        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}