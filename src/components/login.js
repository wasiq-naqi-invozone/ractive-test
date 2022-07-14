import Ractive from 'ractive';
import Router from '../utils/ractive-router'

export default Ractive.extend({
    template: `
        <div class="d-flex hvh-100 align-items-center justify-content-center">
            <div class="col-md-5">
                <form>
                    <div class="form-group">
                    <label for="input-user"><span class="text-muted ft-20">User</span></label>
                    <select value={{}} class="form-control form-control-lg">
                        <option value="">Select User</option>
                        <option value="1">User 1</option>
                        <option value="2">User 2</option>
                        <option value="3">User 3</option>
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

    },
    on: {
        onSubmit(){
            console.log("Submit");
            Router.go('/lead');
        },
    },
    onSubmit(){
        console.log("Submit");
    },
    oninit() {
        console.log('Home init');
    },
    onteardown() {
        console.log('Home teardown');
    }
});