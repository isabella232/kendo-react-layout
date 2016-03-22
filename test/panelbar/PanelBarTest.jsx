import * as React from 'react';
import { shallow } from 'enzyme';
import PanelBar from '../../src/panelbar/PanelBar';
import PanelBarItem from '../../src/panelbar/PanelBarItem';
import PanelBarNavigation from '../../src/panelbar/PanelBarNavigation';

describe('PanelBar', () => {
    let result;

    beforeEach(() => {
        spyOn(console, 'error');
    });

    it('should render a PanelBarNavigation', () => {
        result = shallow(<PanelBar />);
        expect(result.type().name).toEqual('PanelBarNavigation');
    });

    it('should set isMaster to children', () => {
        result = shallow(<PanelBar />);

        let items = result.find(PanelBarNavigation);

        expect(items.first().props().isMaster).toEqual(true);
    });

    it('should pass custom props to children', () => {
        result = shallow(<PanelBar customProp />);

        let items = result.find(PanelBarNavigation);

        expect(items.first().props().customProp).toEqual(true);
    });

    it('should pass children to PanelBarNavigation', () => {
        result = shallow(<PanelBar>
            <PanelBarItem key="1" title="first" />
        </PanelBar>);

        let items = result.find(PanelBarNavigation);

        expect(items.first().props().expanded).toEqual(true);
    });

    it('should pass default parentId to children', () => {
        result = shallow(<PanelBar>
            <PanelBarItem expanded selected key="1" title="first" />
        </PanelBar>);

        let items = result.find(PanelBarNavigation);

        expect(items.first().props().parentId).toEqual(null);
    });

    it('should accept only PanelBarItem as child', () => {
        result = shallow(<PanelBar>sometext</PanelBar>);

        expect(console.error).toHaveBeenCalledWith("Warning: Failed propType: PanelBar child should be either PanelBarItem or Array of PanelBarItem.");
    });

    it('should accept only PanelBarItem array as children', () => {
        result = shallow(<PanelBar>sometext<PanelBarItem title="some title" /></PanelBar>);

        expect(console.error).toHaveBeenCalledWith("Warning: Failed propType: PanelBar children should be either PanelBarItem or Array of PanelBarItem.");
    });
});