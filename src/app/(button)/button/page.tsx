import { Button } from "@/components/ui/button";
import { Divapp } from "./divapp";

const red = [{ key: 0, names: "default" }];

function ButtonPage() {
  return (
    <div className="container relative z-40 mx-auto mt-12">
      {red.map((red) => (
        <div
          key={red.key}
          className="block w-1/2 py-10 text-center border lg:w-1/4"
        >
          <Button variant="locked">foo</Button>
        </div>
      ))}

      <div className="flex flex-wrap justify-center mx-auto lg:w-full md:w-5/6 xl:shadow-small-blue">
        <Divapp>
          <Button variant="locked">foo</Button>
        </Divapp>
        <Divapp>
          <Button variant="default">foo</Button>
        </Divapp>

        <Divapp>
          <Button variant="primary">foo</Button>
        </Divapp>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="primaryOutline">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="secondary">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="secondaryOutline">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="danger">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="dangerOutline">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="super">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="superOutline">foo</Button>
        </div>
        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="ghost">foo</Button>
        </div>
        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="sidebar">foo</Button>
        </div>

        <div className="block w-1/2 py-10 text-center border lg:w-1/4">
          <Button variant="sidebarOutline">foo</Button>
        </div>
        <div className="block w-1/2 py-10 text-center border lg:w-1/4"></div>
        <div className="block w-1/2 py-10 text-center border lg:w-1/4"></div>
        <div className="block w-1/2 py-10 text-center border lg:w-1/4"></div>
      </div>
    </div>
  );
}

export default ButtonPage;
