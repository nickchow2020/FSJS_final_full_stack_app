const url = 'http://localhost:5000/api';


export default class Data{

    //api method handle the HTTP Request with authenticate USER  
    api(path,method,body=null,requireAuth=false,credentials=null){
        const fetchUrl = url + path;

        const options = {
            method,
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            }
        }

        if(requireAuth){
            const encrypted = btoa(`${credentials.username}:${credentials.password}`);
            options.headers.Authorization = `Basic ${encrypted}`;
        }

        if(body !== null){
            options.body = JSON.stringify(body)
        }

        return fetch(fetchUrl,options)
    }

    //GET single course method 
    async getCourse (id){
        const response = await this.api(`/courses/${id}`,"GET")
        if(response.status === 200){
            return response.json().then(data => data.course[0]);
        }else if (response.status === 500){
            return null
        }else{
            throw new Error();
        }
    }

    //Create a new User
    async createUser (user){
        const response = await this.api("/users","POST",user);
        if(response.status === 201){
            return [];
        }else if(response.status === 400){
            return response.json().then(data =>{
                return data.message;
            })
        }else{
            throw new Error();
        }
    }

    //GET USER Sign in method
    async getUser (username,password){
        const response = await this.api("/users","GET",null,true,{username,password})
        if(response.status === 200){
            return response.json().then(data => data)
        }else if (response.status === 401){
            return null
        }else{
            throw new Error()
        }
    }

    //POST create a new course
    async createCourse (course,username,password){
        const response = await this.api("/courses","POST",course,true,{username,password})
        if(response.status === 201){
            return [];
        }else if (response.status === 400){
            return response.json().then(data => {
                return data.message;
            })
        }else{
            throw new Error();
        }
    }

    //PUT update courses
    async updateCourse (id,data,username,password){
        const response = await this.api(`/courses/${id}`,"PUT",data,true,{username,password})
        if(response.status === 204){
            return []
        }else if(response.status === 400){
            return response.json().then(data => {
                return data.message
            })
        }else{
            throw new Error()
        }
    }

    //DELETE course
    async deleteCourse (id,course,username,password){
        const response =  await this.api(`/courses/${id}`,"DELETE",course,true,{username,password})
        if(response.status === 204){
            return null
        }else{
            throw new Error()
        }
    }
}