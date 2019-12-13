import {create, act} from 'react-test-renderer';
import App from './App'//or import App from './index


//render the component
let root;
act(()=> {
    root = create(<App value={1}/>)
})

//make assertions on root
expect(root.toJSON()).toMatchSnapShot();

//update with some different props

act(() => {
    root = root.update(<App value={2}/>)
})

//make assertions on root
expect(root.toJSON()).toMatchSnapshot();