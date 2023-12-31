import React ,{useState} from 'react'

const login = () => {
  const[form ,setloginForm]= useState({email :"" , password :""})
  const [token ,setToken] = useState('');
  const loginData = async (e : React.MouseEvent<HTMLButtonElement>) =>{
     e.preventDefault()
     try {
       const response = await fetch('http://127.0.0.1:1337/admin/login' , {
        method :'POST' , 
        headers :{
          'Content-Type' :'application/json',
          

        },
        body : JSON.stringify({ ...form , action:'login'}) 
       })
       if(response.ok){
        const content = await response.json()
        console.log(content);

      
      // Store the token in localStorage
        localStorage.setItem('token' , content.token)

      // Update the token state )
      setToken(content.token);

        window.location.href = '/admin/dashboard'
       }else if(response.status === 404) {
         alert('Email or password not found')
       }else if(response.status === 401) {
        alert("Invalid Password")
       }else{
        throw Error('login fail')
       }
     } catch (error) {
      console.log(error);
      alert('Login fails')
     }
  }
  const handleChange = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target  ;
    setloginForm((preform) => ({
      ...preform ,
      [name] :value,
    }));
    
  }
  return (
    <div>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Icons8_flat_todo_list.svg/1024px-Icons8_flat_todo_list.svg.png"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="/forgotpassword" className="font-semibold text-blue-800 hover:blue-900">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type='password'
              autoComplete="password"
              value={form.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button 
          onClick={loginData}
            type="submit"
            className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-blue-800 hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
            
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="/signup" className="font-semibold leading-6 text-blue-800 hover:blue-900">
          Create account
        </a>
      </p>
    </div>
  </div>
    </div>
  )
}

export default login
