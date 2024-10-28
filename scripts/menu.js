fetch("scripts/menu.xml")
  .then((response) => response.text())
  .then((xmlString) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "application/xml");
    const categories = xml.documentElement.children;
    let menuHTML = "";

    for (let category of categories) {
      for (let item of category.children) {
        let itemHTML = `<div class="menu-item">`;

        for (let property of item.children) {
          if (property.tagName.toLowerCase() === "image") {
            itemHTML += `<img src="${property.textContent}" alt="${item.getElementsByTagName("name")[0].textContent}">`;
          } else if (property.tagName.toLowerCase() === "price") {
            itemHTML += `<p>Price: ${property.textContent}</p>`;
          } else {
            itemHTML += `<p>${property.textContent}</p>`;
          }
        }

        itemHTML += `</div>`;
        menuHTML += itemHTML;
      }
    }

    document.getElementById("menu-container").innerHTML = menuHTML;
  });
