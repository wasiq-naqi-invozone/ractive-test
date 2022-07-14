import Ractive from 'ractive';
import Router from '../utils/ractive-router'

export default Ractive.extend({
    template: `
            <div class="row mt-5">
            <div class="col-md-12 d-flex align-items-center justify-content-between">
                <p class="mb-0 ft-20 text-uppercase text-muted">Elapsed Time</p>
                <button on-click="onExit" class="text-uppercase btn btn-secondary rounded-pill">Exit</button>
            </div>
        </div>

        <div class="row mt-5 mb-5">
            <div class="col-md-12 d-flex justify-content-between">
                <button class="text-uppercase btn btn-dark rounded-pill px-5 py-2">Positive reply</button>
                <button class="text-uppercase btn btn-dark rounded-pill px-5 py-2">Neutral reply</button>
                <button class="text-uppercase btn btn-dark rounded-pill px-5 py-2">Not a lead</button>
            </div>
        </div>

        <div class="row mt-80">
            <div class="col-md-12">
                <h2 class="text-center text-muted">Email</h2>
            </div>
            <div class="col-md-12">
                <form>
                    <div class="form-group">
                    <input type="text" class="form-control form-control-lg bg-grey-light" placeholder="Subject">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control bg-grey-light" rows="10" placeholder="Body"></textarea>
                    </div>
                </form>
            </div>
        </div>
    `,
    on: {
        onExit(){
            console.log("Submit");
            Router.go('/overview');
        },
    },
    oninit() {
        console.log('Lead init');
    },
    onteardown() {
        console.log('Lead teardown');
    }
});