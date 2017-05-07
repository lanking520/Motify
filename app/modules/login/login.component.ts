import { Component } from '@angular/core';
import * as tnsOAuthModule from 'nativescript-oauth';
import { Router } from '@angular/router';
import { Page } from'ui/page';
import { RouterExtensions } from "nativescript-angular";
import { User } from '../shared/user/user';



@Component({
    selector: "login",
    templateUrl: 'modules/login/login.component.html',
    // providers: [User]
})

export class LoginComponent {

    constructor(private router: Router, private page: Page, private routerExtensions: RouterExtensions, private user: User) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    public onTapLogin() {
        tnsOAuthModule.ensureValidToken()
            .then((token: string) => {
                console.log('Token is ' + token);
                this.user.token = token;
            })
            .catch((er) => {
                console.log('error logging in');
            })
            .then(() => {
            this.routerExtensions.navigate(['/home'], {clearHistory:true});
        })
    }

    public authcallback() {
        console.log("this is callback")
    }

    public onTapLogout() {
        tnsOAuthModule.logout()
            .then(() => {
                console.log('logged out');
            })
            .catch((er) => {
                console.log('error happens when logging out');
                console.log('printing out error');
                console.dir(er);
            })
            .then(() => {
            this.router.navigate(['/'])
            })
    }
}
