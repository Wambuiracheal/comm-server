let url = "http://localhost:3000/students"
document.addEventListener("DOMContentLoaded",()=>{
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(student => {
                displayStudents(student)
            })

    })
    .catch(error => console.log(error))
            //CATCH ERROR SYNTAX-you can use this instead it's a matter of preference
            // async function displayStudents2(){
            // try{
            //     const response = await fetch(url)
            //         const data = await response.json()
            //         data.forEach(student => displayStudents(student))
            // }catch(error){
            //     console.log(error)
            // }
            // displayStudents2()

        //POST
        document.getElementById("add-form").addEventListener("submit",(event)=>{
            event.preventDefault()
            const formdata = new FormData(event.target)
            const newData = {
                name:formdata.get('name'),
                age:formdata.get('age'),
                studentNo:formdata.get('studno')
            }

            fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(newData)
            })
            .then (response => response.json())
            .then( () =>{
                console.data(newData)
                .catch(error => console.log(error))
            })
        })
    })
    
    //EDIT part form
    function displayStudents(student){
        let studContainer = document.createElement("div")
        studContainer.classList.add("student")
        studContainer.innerHTML = `
        <p>Name: ${student.name}</p>
        <p>Age: ${student.age}</p>
        <p>Number: ${student.studentNo}</p>
        <form id="edit-form" onsubmit="editStud(event,this,${student.id})">
            <label for="name">New Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="age">New Age:</label>
            <input type="text" id="age" name="age" required><br><br>
            <label for="studno">New Number:</label>
            <input type="text" id="studno" name="studno" required><br><br>
            <button id="update-btn">Update</button><br><br>
        </form>
        <button id="delete-btn" onclick="deleteStud(${student.id})">Delete</button>
        `
        let studList = document.getElementById("students")
        studList.appendChild(studContainer)
    }
      


//DELETE function
function deleteStud(id){
    fetch(`url/${id}`,{
        method: "DELETE",
        headers:{
            'Content-type':"application/json"
        }

        .then(response => response.json())
        .then(()=>{
            alert("Deleted Successfully")
        })
        .catch(error => console.log(error))
    })
}
    //UPDATE function
    function editStud (e,form,id){
        e.preventDefault()
        const formData = new FormData(form)
        const updateData = {
            name: formData.get("name"),
            age: formData.get("age"),
            studentNo: formData.get("studno")
        }
        fetch(`${url}/${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(updateData),
        })
        .then(response => response.json())
        .then(()=>{
            alert("Updated Successfully")
        })
        .catch(error => console.log(error))
        
    }

    //ASYN AWAIT KEYWORD FUNCTION
    // async function displayStudent2(){
        // //FETCH SYNTAX
        // const response = await fetch(url)
            // const data =  response.json()

            // console.log(data)

        // //CATCH ERROR SYNTAX-----you can use it at the top
        // async function displayStudent2(){
        // try{
        //     const response = await fetch(url)
        //         const data = await response.json()
        //         data.forEach(student => console.log(student))
        // }catch(error){
        //     console.log(error)
        // }
    // }}


