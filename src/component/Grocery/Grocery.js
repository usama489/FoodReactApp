const Grocery = ()=>{
    return(
        <h1>Grocery Component is too big so it increases the size of bundled file so here we will 
            make small bundled files by chunking, code splitting, Dynamic Bundling, Lazy Loading, onDemand Loading,
            Dynamic Import.
            So, when we load grocery component so then only grocery component bundled file should load to reduce index.js
            bundle file size.
            we will use lazy loading for app, when our main page gets load grocery bundled file will not get load.
        </h1>

    )
}
export default Grocery;