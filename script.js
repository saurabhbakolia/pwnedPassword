const submit = document.getElementById("submit");
let input = document.getElementById("password");
const output = document.getElementById("output");

submit.onclick = (e) => {
    e.preventDefault();

    logSha1(input.value);

    async function logSha1(str) {
        const buffer = new TextEncoder('utf-8').encode(str);
        const digest = await crypto.subtle.digest('SHA-1', buffer);

        // Convert digest to hex string
        const result = Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, '0')).join('');
        console.log(typeof result);

        const suffix = result.slice(0, 5).toUpperCase();
        const prefix = result.slice(5);
        console.log(suffix);
        console.log(prefix);

        const url = "https://api.pwnedpasswords.com/range/";
        // Fetch API
        let fetchRes = fetch(url.concat(suffix));
        // fetchRes is the promise to resolve
        // it by using.then() method
        fetchRes.then(res =>
            res.text()).then(data => {
            let pass = data.split("\r\n");
            // console.log(pass);
            // pass.forEach(check);    
            // function check(value) {
            //     let match = value.split(":");
            //     // console.log(match[0]);
            //     if(match[0] == prefix.toUpperCase()) {
            //         console.log("Password Found\n" + match[1] + " times");
            //     }else{
            //         console.log("Password Not Found\n");
            //     }
            // }
            
            let found = false;
            for(let i = 0; i < pass.length; i++) {
                let hash = pass[i];
                let h = hash.split(":");

                if(h[0] == prefix.toUpperCase()) {
                    console.log("Password Found\n" + h[1] + " times");
                    output.innerHTML = "This password has been seen " +  h[1]  + " times.";
                    found = true;
                    break;
                }
            }

            if(!found){
                console.log("Password Not Found\n");
                output.innerHTML = "Your Password NOT Found";

            }
        })

    };

};