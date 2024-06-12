const Breadcrumb = () => {
  return (
    <nav className="flex mb-4 breadcrumb px-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a href="#" className="inline-flex items-center hover:text-teal-600">
            Dashboard
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <i className="bx bx-chevron-right text-2xl"></i>
            <a
              href="#"
              className="ml-2 inline-flex items-center hover:text-teal-600"
            >
              Product
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <i className="bx bx-chevron-right text-xl"></i>
            <span className="ml-2 inline-flex items-center">All Product</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
