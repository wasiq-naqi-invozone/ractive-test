import Ractive from 'ractive';
import Router from '../utils/ractive-router'
import storage from '../utils/localstorage';
var user = localStorage.getItem('loginUser');
 var data1 = JSON.parse(user);
const storageName = 'emailData';

export default Ractive.extend({
    template: `
            <div class="row mt-5">
            <div class="col-md-12 d-flex align-items-center justify-content-between">
                <button on-click="resetApplication" class="text-uppercase btn btn-danger rounded-pill">Reset Applications</button>
                <h2 class="mb-0 text-uppercase text-muted">Overview Page</h2>
                <button on-click="onBack" class="text-uppercase btn btn-secondary rounded-pill">Back</button>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-md-12">
            <h4 class="text-muted">Positive replies: {{countPositiveReply}}</h4>
            <h4 class="text-muted">Neutral replies: {{countNeutralReply}}</h4>
            <h4 class="text-muted">Not a lead: {{countNotALead}}</h4>
            </div>
        </div>

        <div class="row mt-80">
       
            <div class="col-md-12">
                <h2 class="text-center text-muted">All Leads</h2>
            </div>
            <div class="col-md-12">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Proceed By</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>wasiqnaqi@gmail.com</td>
                    <td>Subject 1</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-light">Pending</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob@yahoo.com</td>
                    <td>Subject 2</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-success">Positive reply</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>ali@gmail.com</td>
                    <td>Needing a notebook</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-primary">Neutral reply</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>saboor.saleem@gmail.com</td>
                    <td>Needing a notebook too</td>
                    <td>Wasiq Naqi</td>
                    <td>
                    <span class="badge badge-secondary">Not a lead</span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="col-md-12 mb-2">
            <div class="border rounded p-3">
                <div class="d-flex align-items-center justify-content-between">
                <p><b>Email:</b> wasiq.naqi@gmail.com</p>
                <p><b>Processed By:</b> Wasiq Naqi</p>
                <div>
                    <b>Status:</b> <span class="badge badge-light">Pending</span>
                </div>
                </div>
                <div>
                <div class="form-group">
                    <div class="form-group">
                    <input type="text" class="form-control bg-grey-light" placeholder="Subject">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control bg-grey-light" rows="4" placeholder="Body"></textarea>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {{#each emailData}}
            <div class="col-md-12 mb-2">
                <div class="border rounded p-3">
                    <div class="d-flex align-items-center justify-content-between">
                    <p><b>Email:</b> {{.email_lead}}</p>
                    <p><b>Processed By:</b> Ali Naseer</p>
                    <div>
                        <b>Status:</b> 
                       {{#if .status == 'pending'}}<span class="badge badge-light">Pending</span>{{/if}}
                       {{#if .status == 'positive_reply'}}<span class="badge badge-success">Positive reply</span>{{/if}}
                       {{#if .status == 'neutral_reply'}}<span class="badge badge-primary">Neutral reply</span>{{/if}}
                       {{#if .status == 'not_a_lead'}}<span class="badge badge-secondary">Not a lead</span>{{/if}}
                    </div>
                    </div>
                    <div>
                    <div class="form-group">
                        <div class="form-group">
                        <input value={{.subject}} disabled type="text" class="form-control bg-grey-light" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <textarea value={{.body}} disabled class="form-control bg-grey-light" rows="4" placeholder="Body"></textarea>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {{/each}}


        </div>
    `,
    data:{ 
        emailData: [],
        processedBy:"",
        countPositiveReply: 0,
        countNeutralReply: 0,
        countNotALead: 0,
    },
    on:{
        onBack(){
            console.log("Back");
            Router.go('/');
        },
        resetApplication(){
            const currentData = this.get('emailData');
            const newData = currentData.map((item) => {
                return{
                    item,
                    status: 'pending'
                }
            })

            this.storage.setAll(newData);
            this.set('emailData', newData)
        }
    },
    storage: storage(storageName),
    oninit() {
        console.log('Overview init');
        const data = this.storage.getAll();
        this.set('emailData', data);
        this.set('processedBy',data1.name);
    },
    observe:{
        // Observe changes on the array
        'emailData' () {

            let status = {};
            // console.log('array observer', arguments)
            const newData = this.get('emailData');
            for(let item of newData ){
                if(status.hasOwnProperty(item.status)){
                    status[item.status] += 1;
                }
                else{
                    status[item.status] = 1;
                }
            }

            // Update variables
            this.set('countPositiveReply', status['positive_reply'] );
            this.set('countNeutralReply', status['neutral_reply'] );
            this.set('countNotALead', status['not_a_lead']);
        },
    },
    onteardown() {
        console.log('Overview teardown');
    }
});