        const company = document.getElementsByClassName("company");
        const company_logo = document.getElementsByClassName("company_logo");
        const count = document.getElementsByClassName("count");
        const company_name = document.getElementsByClassName("company_name");
        const recent_breach_details = document.getElementsByClassName("recent_breach_details");
        const largest_breach_details = document.getElementsByClassName("largest_breach_details");

        


        const url = "https://haveibeenpwned.com/api/v3/breaches/";
        // Fetch API
        let fetchRes = fetch(url);
        // fetchRes is the promise to resolve
        // it by using.then() method
        fetchRes.then(res =>
            res.json()).then(data => {
            let array1 = structuredClone(data);
            array1.sort(dynamicSort("-PwnCount"));
            // console.log(array1);  

            let largest = ``;
            let recent = ``;
            for (let i = 0; i < 10; i++) {
                // console.log(data[i]['Name']);s
                largest += `<div class="company">
                <div class="company_logo"><img src="${array1[i]['LogoPath']}" alt=""></div>
                <div class="company_count"><p>${array1[i]['PwnCount']}</p></div>
                <div class="company_name"><a href="#">${array1[i]['Name']}</a></div>
            </div>`;
            }

            largest_breach_details[0].innerHTML = largest;

            // SORT THE DATA IN DATE ORDER
            
        
            // console.log(data);
            data = _.sortBy(data, function(o) { return new moment(o.AddedDate); }).reverse();
            console.log(data);

            
            recent = ``;
            for (let i = 0; i < 10; i++) {
                console.log(data[i]['Name']);
                recent += `<div class="company">
                <div class="company_logo"><img src="${data[i]['LogoPath']}" alt=""></div>
                <div class="company_count"><p>${data[i]['PwnCount']}</p></div>
                <div class="company_name"><a href="#">${data[i]['Name']}</a></div>
            </div>`;
            }

            recent_breach_details[0].innerHTML = recent; 


            // if (!found) {
            //     show[0].style.display = "none";
            //     danger[0].style.display = "none";
            //     safe[0].style.display = "revert";
            //     no_real[0].style.display = "none";
            //     console.log("Password Not Found\n");
            // }
        })

        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                /* next line works with strings and numbers, 
                 * and you may want to customize it to your needs
                 */
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        };

       /*  function sorByDate(arr){
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index]['AddedDate'];
                function sorter(element) {
                    arr[element]['AddedDate'] = new Date(b.AddedDate).getTime();
                }
            }
            console.log("running sor by date");
            console.log(arr.reverse(arr[index]['AddedDate']));
        }
 */
        