import { Button, Card, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { CloseBtn } from "../../../sharable_components/small_components/buttons/buttons"

import FileBase from 'react-file-base64'

import { post_new_package } from "../../../../actions/admin/packages_actions"
import { get_all_packages_list } from "../../../../actions/packages_actions"
import './dash_staff.css'
import { new_package_payload } from "./payloads"


export const Ingestion = () => {

    return (
        <div>
            <Routes>
                <Route path="" element={<IngestionHome />} />
                <Route path="packages/all" />
                <Route path="packages/new" element={<NewPackAdd />} />
                <Route path="packages/delete" element={<DeletePack />} />
                <Route path="packages/edit" />
            </Routes>
        </div>
    )
}

const IngestionHome = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Paper className="dash_welcome">
            </Paper>
            <div className="dash_cards_box">
                {/* <Card className="dash_cards"  onClick={e=> navigate('packages/all')}>
                    View All Packages
                </Card> */}
                <Card className="dash_cards"  onClick={e=> navigate('packages/new')}>
                    Add New Package
                </Card>
                {/* <Card className="dash_cards"  onClick={e=> navigate('packages/delete')}>
                    Remove Packages
                </Card>
                <Card className="dash_cards" onClick={e=> navigate('packages/edit')}>
                    Edit Packages
                </Card> */}
            </div>
        </div>
    )
}


export const NewPackAdd = () => {
    const dispatch = useDispatch()
    const [newpack, setNewpack] = useState(new_package_payload)

    const [addImg, setAddImg] = useState({
        image:"",
        name:""
    })

    const addpackage = (e) => {
        e.preventDefault()
        window.scrollTo(0,0)
        dispatch(post_new_package(newpack))
    }

    const removeImage = (img) => {
        let index = newpack.images?.indexOf(img)
        newpack.images.splice(index,1)
        setNewpack({...newpack})
    }

    // tags
    const [tags, setTags] = useState([])
    const addTags = () => {
        setNewpack({...newpack, tags: tags})
    }

    const handleTags = (event) =>{
        const {target:{value}} = event 
        setTags( typeof value === 'string'? value.split(','):value)
        addTags()
    }

    // prices
    const [price, setPrice] = useState({type:"", amount:"", currency:"KES"})

    const [all_prices, setAllPrices] = useState([])

    return (
        <Paper className='paper margin_around paper_form'>
            <form noValidate={false} onSubmit={e=>addpackage(e)} >
                <div className="flexrow">
                    <h3>
                        Enter Package Details
                    </h3>
                    <div>
                        <p>
                            <Button variant="contained" color="success" type="submit" size="large"> Submit </Button>
                        </p>
                    </div>
                </div>
                <div>
                    {/* <h5>
                        Package Reference Number: Random
                    </h5> */}
                </div>
                <div className="textfield">
                    <TextField required variant="outlined" size="small" label="Title" value={newpack.package.title} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, title:e.target.value}})} />
                </div>
                <div>
                    Package Cover Image
                    <div className={"fileInput textfield"}>
                        <FileBase
                        type="file"
                        className={"fileInput"}
                        multiple={false}
                        onDone={({base64})=>setNewpack({...newpack, package:{...newpack.package, cover_image:base64}})}
                        />
                    </div>
                </div>
                <div className="textfield"> 
                    <TextField required variant="outlined" size="small" label="Promo Description" multiline={true} rows={4} value={newpack.package.description} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, description:e.target.value}})} placeholder="Type captivating promo description..." />
                </div>
                <div className="textfield space_fields">
                    <TextField variant="outlined" size="small" label="Final Destination: Country" value={newpack.package.country} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, country:e.target.value}})} />
                </div>
                <div className="textfield space_fields">
                    <TextField variant="outlined" size="small" label="Final Destination: City/Town" value={newpack.package.city_town} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, city_town:e.target.value}})} />
                </div>
                <div className="textfield space_fields">
                    <TextField type={'number'} variant="outlined" size="small" label="No of Days" value={newpack.package.no_of_days} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package,no_of_days:e.target.value}})} placeholder="eg 3"/>
                </div>
                <div className="textfield space_fields">
                    <TextField type={'number'} variant="outlined" size="small" label="No of nights" value={newpack.package.no_of_nights} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package,no_of_nights:e.target.value}})} placeholder="eg, 2"/>
                </div>
                <div className="textfield space_fields">
                    <TextField type={'date'} variant="outlined" size="small" label="From(Date)" value={newpack.package.package_from} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package,package_from:e.target.value}})} placeholder=""/>
                </div>
                <div className="textfield space_fields">
                    <TextField type={'date'} variant="outlined" size="small" label="To(Date)" value={newpack.package.package_to} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package,package_to:e.target.value}})} placeholder=""/>
                </div>
                <div className="textfield">
                    <TextField variant="outlined" size="small" multiline={true} rows={4} label="Itinerary" value={newpack.package.package_particulars} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, package_particulars:e.target.value}})} />
                </div>
                <>Prices</>
                {all_prices?.map(p=>
                    <div key={p.type} className="pack_image_list">
                        <div>{p.amount} {p.currency}</div>
                        {p.type}
                        <div><Button variant="text" color="error" onClick={e=>{
                            setAllPrices(all_prices.filter(pr => pr!==p))
                            setNewpack({...newpack, price:all_prices})
                            }}>x</Button></div>
                    </div>
                    )}
                <Paper className="pack_image_list2">
                        <FormControl fullWidth>
                            <InputLabel id="sel_label" variant="standard">Price Description</InputLabel>
                                <Select
                                labelId="sel_label"
                                id="price"
                                value={price.type}
                                onChange={e=>setPrice({...price, type:e.target.value})}
                                fullWidth
                                variant="standard"
                                size="small"
                                >
                                    <MenuItem value={"PER PERSON PER DAY"}>Price Per Person Per Day</MenuItem>
                                    <MenuItem value={"PER PERSON PER TOUR"}>Price Per Person Whole Trip</MenuItem>
                                    <MenuItem value={"PER TOUR"}>Price Per Tour </MenuItem>
                                    
                                </Select>
                        </FormControl>
                    <div className="textfield">
                            <TextField variant="outlined" size="small" label="Amount" type='number' value={price.amount} fullWidth onChange={e=>setPrice({...price, amount:e.target.value})} />
                    </div>
                    <Button
                    disabled={(!price.amount || !price.type)}
                    onClick={e=>{
                        setAllPrices([...all_prices, price])
                        setPrice({...price, type:"", amount:""})
                        setNewpack({...newpack, price:all_prices})

                    }}
                    
                    >Add</Button>
                </Paper>
                <div className="textfield">
                    <TextField variant="outlined" size="small" multiline={true} rows={4} label="Price includes" value={newpack.package.requirements} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, requirements:e.target.value}})} />
                </div>
                <div className="textfield">
                    <FormControl fullWidth>
                            <InputLabel id="sel_label2" variant="standard">Tags</InputLabel>
                                <Select
                                labelId="sel_label2"
                                id="tags"
                                value={tags}
                                onChange={e=>handleTags(e)}
                                fullWidth
                                variant="standard"
                                multiple
                                input={<OutlinedInput label='Tags' />}
                                >
                                    <MenuItem value={"Safari"}>Safari</MenuItem>
                                    <MenuItem value={"Vacations"}>Vacations</MenuItem>
                                    <MenuItem value={"Day Tours"}>Day Tours </MenuItem>
                                    <MenuItem value={"Adventures"}>Adventures </MenuItem>
                                    
                                </Select>
                        </FormControl>
                </div>
                
                <div>
                    <h4>
                        Gallery For the package(optional)
                    </h4>
                </div>
                {newpack.images?.map(i=>(
                    <div key={i.image} className="pack_image_list"> 
                        <div>
                            {newpack.images.indexOf(i)+1}. {i.name} 
                            <p>
                                img
                            </p>
                        </div>
                        <CloseBtn value={i.image} onclose={e=>removeImage(i)}/>
                    </div>
                ))}
                <Paper className="pack_image_list2 paper">
                    <TextField variant="outlined" size="small" label="Image Description" value={addImg.name} fullWidth onChange={e=>setAddImg({...addImg, name:e.target.value})} />
                    <div className={"fileInput textfield"}>
                        <FileBase
                            type="file"
                            className={"fileInput"}
                            required={true}
                            multiple={false}
                            onDone={({base64})=>setAddImg({...addImg, image:base64})}
                        />
                    </div>
                    <Button variant="outlined" color="success" size="small" value={"Add Image"} onClick={e=>{
                        e.preventDefault()
                        if(addImg.image!=="" || addImg.name!==""){
                            setNewpack({...newpack, images:[...newpack.images, addImg]})
                            setAddImg({name:"", image:""})
                        }
                    }}> Add </Button>
                </Paper>
               
            </form>
        </Paper>
    )
}

export const DeletePack = () =>{
    const [packages, setPackages] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(get_all_packages_list())
    }, [dispatch])

    const packages_list = useSelector(state=>state.list_view)

    const removePackage = (id) => {
        setPackages(packages_list.filter(p => p.package_id !== id))
    }

    return (
        <div className="margin_around">
            <Typography variant="h6">DELETE Packages</Typography>
            <FormHelperText><small>Deletion is not reversible</small></FormHelperText>
            {packages_list.map(p => 
                <Card key={p.package_id} className='remove_card flexrow'>
                    <div>
                        {p.title}
                    </div>
                    <div>
                        {/* <a href={PACKAGES_ROUTE+'/'+p.package_id}>Details</a> */}
                        </div>
                    <div>
                        <Button variant="outlined" color="error" onClick={e=>removePackage(p.package_id)}>DELETE</Button>
                    </div>
                </Card>
                )}
        </div>
    )
}

