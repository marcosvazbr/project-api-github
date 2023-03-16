class WorkWithData {
  

  delete(deleteUser) {
    
    function deleteUserForArray(value) {
      if(value.login !== deleteUser)  {
        return value
      }
    }
    this.allUser = this.allUser.filter(deleteUserForArray)
    this.saveLocalSorage()
    this.constructorHTML()
  }

  user(inputUser) {

    fetch(`https://api.github.com/users/${inputUser}`)
    .then(data => { if(data.status == 200) {
      return data} else { throw "" + "\n" + "ERRO!!!" + "\n \n" + "Usuário " + inputUser + " não localizado."  }})
    .then(data => {  return data.json()})
    .then(data => {
       const newUser = {
        "login": data.login,
        "name": data.name,
        "followers": data.followers,
        "public_repos": data.public_repos
      }
      
      this.allUser = [newUser, ...this.allUser]
      this.saveLocalSorage()
      this.constructorHTML()
      
    }) 
    .catch( ( error ) => { alert(error)}) 
    
  }
  
  checkRepeatUser(checkUser) {

      this.userRepeat = false
      this.allUser.filter(value => {
        if(value.login.toLowerCase() == checkUser) { this.userRepeat = true } 
      })
      
      this.userRepeat ? alert('Usuário já cadastrado.') : this.user(checkUser)
    }

  saveLocalSorage() 

    localStorage.setItem('this.allUser', JSON.stringify(this.allUser))
  }
}


export class UpdateApp extends WorkWithData {
  constructor(app){
    super(app)
    this.app
    
    this.allUser = []
    this.inputUserName()  
    this.constructorHTML()

  }
  
  constructorHTML() {
    let localStorageAllUser = localStorage.getItem('this.allUser')
    
    
    if(localStorageAllUser !== null) {

      this.allUser = JSON.parse(localStorageAllUser)
    }

    
    document.querySelector('tbody').textContent = ''
    
    this.allUser.forEach((newUser) => { 
    
    this.constructorTr = document.createElement("tr") 
    this.constructorTr.innerHTML = `<td class="user">
    <img src="" alt="Imagem do usuario">
    <div>
    <a target="_blank" href="">
    <p></p>
    <span></span>
    </div>
    </a>
    </td>
    <td class="repositories"></td>
    <td class="followers"></td>
    <td class="action"><span>Remover</span></td>`

    this.constructorTr.querySelector('img').src = `https://github.com/${newUser.login}.png`
    this.constructorTr.querySelector('a').href = `https://github.com/${newUser.login}`
    this.constructorTr.querySelector('p').innerText = newUser['name']
    this.constructorTr.querySelector('span').innerText = newUser.login
    this.constructorTr.querySelector('.repositories').innerText = newUser.public_repos
    this.constructorTr.querySelector('.followers').innerText = newUser.followers
    const action = this.constructorTr.querySelector('.action').classList.add(newUser.login)
    this.constructorTr.querySelector('.action').onclick=(() => {
      if(confirm('Tem certeza que deseja deletar?')) {
        this.delete(newUser.login)
      }
    })
    

    this.insertHTML()
    
    })
    
  }

  insertHTML() {

    const tbody = document.querySelector('tbody')
    tbody.append(this.constructorTr)
    
    
  }

  inputUserName() {
    
    const addButton = document.querySelector('.input-username button')
    let inputUser = document.querySelector('#github-favorites')

    window.onkeypress = (e) => {
      if(e.key == 'Enter' && inputUser.value !== '' ) {
        this.checkRepeatUser(inputUser.value.toLowerCase())
        inputUser.value = ""
      }
    }

    addButton.onclick = () => {
      this.checkRepeatUser(inputUser.value.toLowerCase())
      inputUser.value = ""
    }
  }
 
}

