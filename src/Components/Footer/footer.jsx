import React from 'react'


const Footer = ()=>{

    const redirect = (route)=>{
        if(route === 'about'){
            window.location.href = "https://about.palscheck.com"
        }else if(route === 'terms'){
            window.location.href = "https://terms.palscheck.com/"
        }else if(route === 'privacy'){
            window.location.href = "https://terms.palscheck.com/privacy"
        }else if(route === 'advert'){
            window.location.href = "https://about.palscheck.com/advertising"
        }else if(route === 'market'){
            window.location.href = "https://about.palscheck.com/marketing"
        }else if(route === 'help'){
            window.location.href = "https://help.palscheck.com/"
        }else if(route === 'store'){
            window.location.href = "https://store.palscheck.com/"
        }else{
            window.location.href = "https://palscheck.com/"
        }
    }
    return (
        <footer class="">
            <div class="mt1">
                <a href="https://about.palscheck.com" onClick={e=>redirect('about')} title="Language" class="f6 ml2 dib mid-gray dim ttc ">About</a>
                <a href="https://terms.palscheck.com/" onClick={e=>redirect('terms')} title="Terms" class="f6 ml2 dib mid-gray dim ttc">Terms of Use</a>
                <a href="https://terms.palscheck.com/privacy" onClick={e=>redirect('privacy')} title="Privacy" class="f6 ml2 dib  mid-gray dim ttc">Privacy</a>
                <a href="https://about.palscheck.com/advertising" onClick={e=>redirect('advert')}  title="Privacy" class="f6 ml2 dib  mid-gray dim ttc">advertising</a>
                <a href="https://about.palscheck.com/marketing" onClick={e=>redirect('market')} title="Privacy" class="f6 ml2 dib  mid-gray dim ttc">marketing</a>
                <a href="https://help.palscheck.com/" onClick={e=>redirect('help')} title="Privacy" class="f6 ml2 dib mid-gray dim ttc">Help</a>
                <a class="f6 ml2 dib  mid-gray dim ttc">palscheck @ {new Date().getFullYear()}</a>
            </div>
            {/* <a className="blue">this is a link</a> */}
        </footer>
    )
}
export default Footer