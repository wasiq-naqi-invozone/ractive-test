import Ractive from 'ractive';
import Router from '../utils/ractive-router'
import jsonData from '../user.json'; 
import emailData from '../emails.json';
import storage from '../utils/localstorage';
console.log(emailData);
const data = JSON.parse(jsonData).map((item)=>{
    return {
        // ...item,
        id:Date.now()
    }
});
console.log(data);
localStorage.setItem('userData', JSON.stringify(jsonData));
localStorage.setItem('emailData', JSON.stringify(emailData));
// var retrievedObject = localStorage.getItem('userData');
// var data = JSON.parse(retrievedObject);
const storageName = 'userData';
// console.log('retrievedObject: ', JSON.parse(retrievedObject));
export default Ractive.extend({
    template: `
        <div class="d-flex hvh-100 align-items-center justify-content-center">
            <div class="col-md-5">
                <form>
                    <div class="form-group">
                    <label for="input-user"><span class="text-muted ft-20">User</span></label>
                    <select value={{selectedUser}} class="form-control form-control-lg">
                    {{#each userData:index}}
                    <option value={{index}}>{{name}}</option>
                   {{/each}}
                    </select>
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <div class="wp-80">
                            <button on-click="onSubmit" type="button" class="btn btn-dark btn-lg btn-block rounded-pill">Login</button>
                            <!-- <a href="index.html" class="btn btn-dark btn-lg btn-block rounded-pill">Login</a> -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
    data:{
        userData: [],
        selectedUser:"",
    },
    storage: storage(storageName),
    on: {
        onSubmit(){
            const selectedUser = this.get('selectedUser');
            const user = this.get('userData');
            user.find((loginUser)=> { 
                if (user.indexOf(loginUser) == selectedUser)
                {
                    if(loginUser.status == 'active'){
                        alert('Already loggedIn!!');
                    }
                    loginUser.status = 'active';
                    localStorage.setItem('loginUser',JSON.stringify(loginUser));
                } 
            });
            localStorage.setItem('userData', JSON.stringify(user));
            console.log( user );
            Router.go('/lead');
        },
    },
    oninit() {
        console.log('Home init');
        const data = this.storage.getAll();
        console.log(data);
        this.set('userData', data);
    },
    onteardown() {
        console.log('Home teardown');
    }
});