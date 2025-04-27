interface BusinessTypeTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }
  
  const tabs = [
    { id: 'business-type', label: 'Business type' },
    { id: 'store-type', label: 'Store type' },
    { id: 'business-model', label: 'Business Model' },
    { id: 'locations', label: 'Locations' },
    { id: 'malls', label: 'Malls' },
    { id: 'product-attribute', label: 'Product Attribute' },
    { id: 'categories', label: 'Categories' },
    { id: 'size-guide', label: 'Size Guide' },
  ];
  
  const BusinessTypeTabs = ({ activeTab, onTabChange }: BusinessTypeTabsProps) => {
    return (
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
  };
  
  export default BusinessTypeTabs;