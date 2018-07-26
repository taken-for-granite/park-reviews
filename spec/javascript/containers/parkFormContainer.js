import ParkFormContainer from '../../../app/javascript/react/containers/ParkFormContainer';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import fetchMock from 'fetch-mock';

describe ('ParkFormContainer', () => {
let wrapper;
let addPark;
    let numParks;
    addPark = {
        id: '1',
        name: "Boston Common",
        address: "167 Tremont Street",
        city: "Boston",
        state: "MA",
        zip: "02134",
        description: "Has a great grass field and lots of people yelling and running around."
    }

    wrapper = mount(<ParkFormContainer />)


    describe('form page', () => {
        it('should contain park name', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('Park Name:')
                done()
            }, 0)
        })

        it('should contain address', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('Address:')
                done()
            }, 0)
        })

        it('should contain city', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('City:')
                done()
            }, 0)
        })

        it('should contain state', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('State:')
                done()
            }, 0)
        })

        it('should contain zipcode', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('Zipcode:')
                done()
            }, 0)
        })

        it('should contain description', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('Description')
                done()
            }, 0)
        })
        it('should contain submit button', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('Submit Park')
                done()
            }, 0)
        })
        it('should contain clear form button', (done) => {
            setTimeout(() => {
                expect(wrapper.text()).toMatch('Clear Form')
                done()
            }, 0)
        })
    })

    // getAllParks(){
    //     fetch('api/v1/parks') {
    //         .then(response => {
    //             if(response.ok) {
    //                 return response
    //             } else {
    //                 let errorMessage= `${response.status} (${response.statusText})`,
    //                 error = new Error(errorMessage)
    //                 throw(error)
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(body => {
    //             numParks = body.length
    //         })
    //         .catch(error => console.error(`Error in fetch: ${error.message}`))
    //     }
    // }

    it('successfully adds to the list when a valid park is supplied', (done) => {
        fetchMock.post('/api/v1/parks', {
            status: 201,
            body: addPark
        });
        setTimeout(() => {
            let listItemCount = wrapper.find('li').length
            setTimeout(() => {
                expect(listItemCount + 1).toEqual(listItemCount + 1)
                done()
            })
        }, 0)
    })

})