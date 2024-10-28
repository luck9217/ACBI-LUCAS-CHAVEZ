fetch('scripts/branches.xml')
    .then(response => response.text())
    .then(xmlString => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const branches = xml.getElementsByTagName('branch');
        let branchesHTML = '';

        for (let branch of branches) {
            const address = branch.getElementsByTagName('address')[0].textContent;
            const contact = branch.getElementsByTagName('contact')[0].textContent;
            const hours = branch.getElementsByTagName('hours')[0].textContent;
            const map = branch.getElementsByTagName('map')[0].textContent;

            branchesHTML += `
                <div class="branch">
                    <p>Address: ${address}</p>
                    <p>Contact: ${contact}</p>
                    <p>Hours: ${hours}</p>
                    <a href="${map}" target="_blank">View on Map</a>
                </div>
            `;
        }

        document.getElementById('branches-container').innerHTML = branchesHTML;
    });
