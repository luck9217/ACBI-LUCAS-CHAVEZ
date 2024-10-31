fetch("scripts/menu.xml")
  .then((response) => response.text())
  .then((xmlString) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "application/xml");
    const categories = xml.documentElement.children;
    let menuHTML = "";

    for (let category of categories) {
      let categoryName = category.tagName.replace(/_/g, " ");
      menuHTML += `<h3>${
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      }</h3>`;

      for (let item of category.children) {
        if (
          item.children.length > 0 &&
          item.firstElementChild.tagName.toLowerCase() !== "name"
        ) {
          let subCategoryName = item.tagName.replace(/_/g, " ");
          menuHTML += `<h4>${
            subCategoryName.charAt(0).toUpperCase() + subCategoryName.slice(1)
          }</h4>`;

          for (let subItem of item.children) {
            let subItemHTML = `<div class="menu-item">`;

            for (let property of subItem.children) {
              if (property.tagName.toLowerCase() === "image") {
                subItemHTML += `<img src="${property.textContent}" alt="${
                  subItem.getElementsByTagName("name")[0].textContent
                }">`;
              } else if (property.tagName.toLowerCase() === "price") {
                subItemHTML += `<p>Price: ${property.textContent}</p>`;
              } else {
                subItemHTML += `<p>${property.textContent}</p>`;
              }
            }

            subItemHTML += `</div>`;
            menuHTML += subItemHTML;
          }
        } else {
          let itemHTML = `<div class="menu-item">`;

          for (let property of item.children) {
            if (property.tagName.toLowerCase() === "image") {
              itemHTML += `<img src="${property.textContent}" alt="${
                item.getElementsByTagName("name")[0].textContent
              }">`;
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
    }

    document.getElementById("menu-container").innerHTML = menuHTML;
  });
