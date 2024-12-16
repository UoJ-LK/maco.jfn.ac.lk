const toggleMenu = (event) => {
    const menu = document.querySelector('.primary-menu-items');
    menu.classList.toggle('show');
    document.addEventListener('click', closeMenuOutside, true);
    event.stopPropagation();
}

const closeMenuOutside = (event) => {
    const menu = document.querySelector('.primary-menu-items');
    const toggle = document.querySelector('.toggle');
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('show');
        document.removeEventListener('click', closeMenuOutside, true);
    }
}

const loadComponent = async (id, url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error fetching ${url}: ${response.status} ${response.statusText}`);
        }
        document.getElementById(id).innerHTML = await response.text();
    } catch (error) {
        console.error(`Failed to load component: ${error}`);
        document.getElementById(id).innerHTML = `<p style="color: red;">Failed to load ${url}</p>`;
    }
}

const components = [
    {id: "nav-placeholder", url: "components/nav.html"},
    {id: "footer-placeholder", url: "components/footer.html"},
];

components.forEach(component => loadComponent(component.id, component.url));

const loadHeadContent = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error fetching ${url}: ${response.status} ${response.statusText}`);
        }

        // Parse the fetched HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(await response.text(), 'text/html');

        // Append each element from the external <head> to the current <head>
        const headContent = doc.head.childNodes;
        headContent.forEach(node => {
            document.head.appendChild(node);
        });
    } catch (error) {
        console.error(`Error loading head content: ${error}`);
    }
}

// Load common head content
loadHeadContent('components/head.html');