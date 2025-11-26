import ListInput from "./contact_List_components/ListInput";
import ListData from "./contact_List_components/ListData";

function App() {
  console.log("app is running");
  return (
    <>
      <div className="container">
        <div className="outer-container">
          <div className="contact-collector">
            <ListInput />
          </div>
          <div className="contacts">
            <ListData />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
