const endpoint = "http://localhost:3000/reservations";

export async function getReservations (userId) {
  try{
    const url = userId? `${endpoint}?userId=${userId}`: endpoint
  
    const request = await fetch(url)
    if(!request.ok) throw new Error("Error fetching tasks");
    return await request.json()
  }catch (error){
    console.error(error)
    return [];
  }
}

export async function createReservations(task){
  try{
    const response = await fetch(endpoint, {
      method: "POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    return response;
  }catch (e){
    console.error(e);
    return null;
  }

}

export async function updateReservation(id, task) {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(task)
    });
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteReservation(id) {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE"
    });
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
}

