import { Box, Button, ButtonGroup, Card, Collapse, FilledInput, FormControl, FormHelperText, FormLabel, IconButton, ImageList, ImageListItem, ImageListItemBar, Input, InputLabel, ListSubheader, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { CloseBtn } from "../../../sharable_components/small_components/buttons/buttons"

import FileBase from 'react-file-base64'

import { activate_package, get_all_packages_all, post_new_package } from "../../../../actions/admin/packages_actions"
import { set_loading } from "../../../../actions/component_actions"
import { post_short_alert_message } from "../../../../actions/error_actions"
import { get_package_detail_view } from "../../../../actions/packages_actions"
import './dash_staff.css'
import { new_package_payload } from "./payloads"

import { AddAPhotoOutlined, CancelOutlined, DeleteOutline, EditOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { get_countries_list } from "../../../../actions/shared_actions"
import { CountrySelect } from "./countries_util"
import { MinMaxDateRangePicker } from "./small_utils"

export const Ingestion = () => {

    return (
        <div>
            <Routes>
                <Route path="" element={<IngestionHome />} />
                <Route path="packages/all" />
                <Route path="packages/new" element={<NewPackAdd mode={'new'} pack={new_package_payload}/>} />
                <Route path="packages/edit" element={<ViewEditPacks />} />
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
                <Card className="dash_cards"  onClick={e=> navigate('packages/new')}>
                    Add New Package
                </Card>
                <Card className="dash_cards" onClick={e=> navigate('packages/edit')}>
                    Modify Packages Data
                </Card>
            </div>
        </div>
    )
}


export const NewPackAdd = ({pack, mode}) => {
    const dispatch = useDispatch()
    const [newpack, setNewpack] = useState(pack)

    const [addImg, setAddImg] = useState({
        image:"",
        name:""
    })

    const addpackage = (e) => {
        window.scrollTo(0, 0)
        e.preventDefault()
        dispatch(set_loading(true, 'Processing...'))
        post_new_package(newpack)
            .then(res=>{
                dispatch(post_short_alert_message({success:res.details}))
                setNewpack(pack)
            })
            .catch(e=>dispatch(post_short_alert_message({error:`Sorry, ${e.message}. Try again Later`})))
            .finally(e=> {dispatch(set_loading(false, ''))})
    }

    const removeImage = (img) => {
        let index = newpack.images?.indexOf(img)
        newpack.images.splice(index,1)
        setNewpack({...newpack})
    }

    // tags
    const [tags, setTags] = useState([])

    const handleTags = (event) =>{
        const {target:{value}} = event 
        setTags( typeof value === 'string'? value.split(','):value)
        setNewpack({...newpack, tags: typeof value === 'string'? value.split(','):value})
    }

    // prices
    const [price, setPrice] = useState({type:"", amount:"", currency:"KES"})

    const [all_prices, setAllPrices] = useState([])


    // utils
    const [countries, set_countries] = useState([])

    useEffect(()=>{
        get_countries_list().then(res=>set_countries(res.results))
    }, [])



    return (
        <Paper className='paper margin_around paper_form view_only'>
            <form noValidate={false} onSubmit={e=>addpackage(e)} onReset={()=>setNewpack(pack)} id='pack_form' >
                <div className="flexrow">
                    <h3>
                        {mode==='new' && "Add a new package"}
                        {mode==='edit' && "Edit Package Details"}
                    </h3>
                    <div>
                        <p>
                        </p>
                    </div>
                </div>
                <div>
                    {/* <h5>
                        Package Reference Number: Random
                    </h5> */}
                </div>
                <div className="textfield">
                    <TextField required variant="outlined"  label="Title" value={newpack.package.title} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, title:e.target.value}})} />
                </div>
                    Package Cover Image
                <Button variant="outlined" color="success" size="large" fullWidth>
                    <FileBase
                        type="file"
                        className={"fileInput"}
                        multiple={false}
                        onDone={({base64})=>setNewpack({...newpack, package:{...newpack.package, cover_image:base64}})}
                        />
                </Button>
                <div className="textfield"> 
                    <TextField required variant="outlined"  label="Promo Description" multiline={true} rows={4} value={newpack.package.description} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, description:e.target.value}})} placeholder="Type captivating promo description..." />
                </div>
                <FormControl fullWidth>
                    <CountrySelect countries={countries} setValue={val=>setNewpack({...newpack, package:{...newpack.package, country:val.name}})} />
                </FormControl>
                <div className="textfield space_fields">
                    <TextField required variant="outlined"  label="Final Destination: City/Town" value={newpack.package.city_town} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, city_town:e.target.value}})} />
                </div>
                <div className="textfield space_fields">
                    <TextField inputProps={{min: 0}} type={'number'} variant="outlined" label="No of Days" value={newpack.package.no_of_days} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package,no_of_days:Number(e.target.value)}})} placeholder="eg 3"/>
                </div>
                <div className="textfield space_fields">
                    <TextField required={newpack.package.no_of_days} inputProps={{min: newpack.package.no_of_days-1, max:Number(newpack.package.no_of_days)+1}} disabled={!newpack.package.no_of_days} type={'number'} variant="outlined"  label="No of nights" value={newpack.package.no_of_nights} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package,no_of_nights:Number(e.target.value)}})} placeholder="eg, 2"/>
                </div>
                <div className="textfield space_fields">
                    <MinMaxDateRangePicker required={false} value={newpack.package.package_from} label={"Start Date"} setValue={value=>setNewpack({...newpack, package:{...newpack.package,package_from:value}})} />
                </div>
                <div className="textfield space_fields">
                    <MinMaxDateRangePicker minDate={newpack.package.package_from} required={newpack.package.package_from? true:false} disabled={!newpack.package.package_from} value={newpack.package.package_to} label={"End Date"} setValue={value=>setNewpack({...newpack, package:{...newpack.package,package_to:value}})} />
                </div>
                <div className="textfield">
                    <TextField required variant="outlined"  multiline={true} rows={4} label="Itinerary" value={newpack.package.package_particulars} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, package_particulars:e.target.value}})} />
                </div>
                <>Prices</>
                {newpack.price?.map(p=>
                    <div key={p.type} className="pack_image_list">
                        <div>{p.amount} {p.currency}</div>
                        {p.type}
                        <div><Button variant="text" color="error" onClick={e=>{
                            setAllPrices(all_prices.filter(pr => pr!==p))
                            setNewpack({...newpack, price:newpack.price.filter(pr => pr!==p)})
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
                                
                                >
                                    <MenuItem value={"PER PERSON PER DAY"}>Price Per Person Per Day</MenuItem>
                                    <MenuItem value={"PER PERSON PER TOUR"}>Price Per Person Whole Trip</MenuItem>
                                    <MenuItem value={"PER TOUR"}>Price Per Tour </MenuItem>
                                    
                                </Select>
                        </FormControl>
                    <div className="textfield">
                            <TextField variant="outlined"  label="Amount" type='number' value={price.amount} fullWidth onChange={e=>setPrice({...price, amount:e.target.value})} />
                    </div>
                    <Button
                    disabled={(!price.amount || !price.type)}
                    onClick={e=>{
                        setAllPrices([...all_prices, price])
                        setNewpack({...newpack, price:[...newpack.price, price]})
                        setPrice({...price, type:"", amount:""})

                    }}
                    
                    >Add</Button>
                </Paper>
                <div className="textfield">
                    <TextField variant="outlined"  required multiline={true} rows={4} label="Price includes" value={newpack.package.requirements} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, requirements:e.target.value}})} />
                </div>
                <div className="textfield">
                    <FormControl fullWidth>
                            <InputLabel id="sel_label2" variant="standard" required>Tags</InputLabel>
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
                            {newpack.images.indexOf(i)+1}. {i.description} 
                            <p>
                                img
                            </p>
                        </div>
                        <CloseBtn value={i.image} onclose={e=>removeImage(i)}/>
                    </div>
                ))}
                <Paper className="pack_image_list2 paper">
                    <div className={"fileInput textfield"}>
                        <FileBase
                            type="file"
                            className={"fileInput"}
                            required={true}
                            multiple={false}
                            onDone={({base64})=>setAddImg({...addImg, image:base64})}
                        />
                    </div>
                    <div className="textfield">
                        <TextField variant="outlined"  label="Image Description" value={addImg.description} fullWidth onChange={e=>setAddImg({...addImg, description:e.target.value})} />
                    </div>
                    <Button variant="outlined" color="success"  value={"Add Image"} onClick={e=>{
                        e.preventDefault()
                        if(addImg.image!=="" || addImg.name!==""){
                            setNewpack({...newpack, images:[...newpack.images, addImg]})
                            setAddImg({description:"", image:""})
                        }
                    }}> Add </Button>
                </Paper>
                {mode!=='view' && 
                    <div>
                        <Button variant="contained" fullWidth color="success" type="submit" size="large"> {mode==='edit'? "Submit Changes": "Submit"} </Button>
                        <Button variant="outlined" fullWidth color="info" type="reset" size="large"> Reset Form </Button>
                    </div>
                }
               
            </form>
        </Paper>
    )
}

export const ViewEditPacks = () =>{
    const [packages, setPackages] = useState({data:[], count:0})
    const [page, set_page] = useState(0)
    const [action, set_action] = useState(0)

    useEffect(()=>{
        get_all_packages_all(page+1).then(res=>setPackages(res))
    }, [page, action])

    const handleChangePage = (event, value) => {
		window.scrollTo({top: document.getElementById("packages").offsetTop - 79, behavior:'smooth'})
		set_page(value);
        set_action(Math.random())
	};


    return (
        <div className="margin_around" id="packages">
            <Typography variant="h6">Packages List</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                            <TableCell sx={{fontWeight:"bold"}}>Expand</TableCell>
                        <TableCell sx={{fontWeight:"bold"}}>Title</TableCell>
                        <TableCell sx={{fontWeight:"bold"}}>Destination</TableCell>
                        <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
                    </TableHead>
                <TableBody>
                {packages.data.map(p=><TableDetailedRow pack={p} set_action={set_action} action={action}/>
                    )}
                </TableBody>
                <TableFooter>
                    <TablePagination
                     page={page} 
                     rowsPerPage={packages.data.length} 
                     rowsPerPageOptions={[packages.data.length]} 
                     count={packages.count} 
                     onPageChange={handleChangePage}/>
                </TableFooter>
            </Table>
            </TableContainer>
            </Paper>
        </div>
    )
}

function TableDetailedRow({pack, set_action, action}) {
    const [open, setOpen] = useState(false)
    const [p, set_p] = useState(pack)
    const [edit, set_edit] = useState(false)

    const dispatch = useDispatch()


    useEffect(()=>{
        if(open){
            get_package_detail_view(pack.package_id).then(res=>set_p(res))
        }
    }, [open, action, pack.package_id])

    
    const removePackage = (id) => {
    }

    const archivePackage = (id) => {

    }

    const activateDeactivatePackage = (id) => {
        dispatch(set_loading(true, "Processing Request..."))
        activate_package(id)
            .then(res=>dispatch(post_short_alert_message({success:res.details})))
            .catch(e=>dispatch(post_short_alert_message({error:e.message})))
            .finally(()=>{
                dispatch(set_loading(false, ""))
                set_action(Math.random())
            })
    }


    return (
        <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown/>}
            </IconButton>
            </TableCell>
                        <TableCell>
                            {pack.title}
                        </TableCell>
                        <TableCell>
                            {pack.city_town}, {pack.country}
                        </TableCell>
                        <TableCell sx={pack.is_active? {color:"green", fontWeight:"bold"}:{color:"red", fontWeight:"bold"}}>
                            {pack.is_active? "Active":"Inactive"}
                        </TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 , width:"100%"}} colSpan={5}>
        <Card >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div style={{width:"100%", minWidth:"300px", margin:"1%"}} className="flexrow wrap">
                <div>
                    <FormHelperText>GREEN ZONE: Enjoy the magic!</FormHelperText>
                    <ButtonGroup>
                        <Button variant="outlined" color="success" onClick={e=>set_edit(!edit)}>{!edit? <EditOutlined/>: <CancelOutlined />}{edit ? "Cancel Editing": "Edit"}</Button>
                        {p.is_active?  
                            <Button variant="outlined" color="warning" disabled={edit} onClick={e=>activateDeactivatePackage(p.package_id)}>Deactivate</Button>:
                            <Button variant="contained" color="warning" disabled={edit} onClick={e=>activateDeactivatePackage(p.package_id)}>Activate</Button>
                        }
                    </ButtonGroup>
                </div>
                <div style={{paddingRight:"1rem"}}>
                    <FormHelperText>RED ZONE: Go slow. Deletion is not reversible</FormHelperText>
                    <ButtonGroup>
                        <Button variant="outlined" color="error" disabled={edit} onClick={e=>archivePackage(p.package_id)}>Archive</Button>
                        <Button variant="contained" color="error" disabled={edit} onClick={e=>removePackage(p.package_id)}><DeleteOutline/>Delete</Button>
                    </ButtonGroup>
                </div>

            </div>
            <Box sx={{ margin: 1 }} width={"100%"} className={"flexrow wrap"}>
                <div style={{width:"47%", minWidth:"300px"}}>
                    <FormControl fullWidth>
                        <FormLabel>Title</FormLabel>
                        <TextField value={p.title} variant="filled" inputProps={{readonly:true}} disabled={!edit} fullWidth/>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel>Description</FormLabel>
                        <TextField value={p.description} variant="filled" inputProps={{readonly:true}} disabled={!edit} multiline={true} fullWidth/>
                    </FormControl>
                </div>
                <div style={{width:"47%", minWidth:"300px"}}>
                    <FormControl fullWidth>
                        <FormControl fullWidth>
                            <FormLabel>Destination (City/Town)</FormLabel>
                            <TextField value={p.city_town} variant="filled" inputProps={{readonly:true}} disabled={!edit}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel>Destination (Country)</FormLabel>
                            <TextField value={p.country} variant="filled" inputProps={{readonly:true}} disabled={!edit}/>
                        </FormControl>
                    </FormControl>
                </div>
                <div style={{width:"47%", minWidth:"300px"}}>
                    <ImageList sx={{ minWidth: 300, height: 450 }} variant="quilted">
                        <ImageListItem key="Subheader" cols={2}>
                            <div className="flexrow">
                                <ListSubheader component="div">Package Gallery </ListSubheader>
                                {edit && 
                                <div>
                                    {"Add Images"}
                                    <AddAPhotoOutlined />
                                </div>
                                }
                            </div>
                            <img 
                                src={`${p.cover_image}?w=248&fit=crop&auto=format`}
                                srcSet={p.cover_image}
                                alt={"Cover"}
                                loading="lazy"
                                
                            />
                            <ImageListItemBar
                                title={"Cover Image"}
                            />
                        </ImageListItem>
                        {p.images?.map((item) => (
                            <ImageListItem key={item.image}>
                            <img
                                src={`${item.image}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.image}`}
                                alt={item.description}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.description}
                                actionIcon={
                                    <DeleteOutline />
                                }
                            />
                            </ImageListItem>
                        ))}
                        </ImageList>                    
                </div>
                <div style={{width:"47%", minWidth:"300px"}}>
                    OTHER DETAILS
                    <div>
                        {edit && 
                        <Button variant="contained" color="success">Submit Changes</Button>
                        }
                    </div>
                </div>
              
                {/* <Table size="small" aria-label="details">
                    <TableBody>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            <ButtonGroup size="small" fullWidth>
                                {p.is_active?  
                                    <Button variant="outlined" color="warning" onClick={e=>{}}>Deactivate</Button>:
                                    <Button variant="contained" color="warning" onClick={e=>{}}>Activate</Button>
                                }
                                <Button variant="outlined" color="success" onClick={e=>{}}><EditOutlined/>Edit</Button>
                            </ButtonGroup>
                        </TableCell>
                        <TableCell>
                            <ButtonGroup size="small" fullWidth>
                                <Button variant="outlined" color="error" onClick={e=>{}}>Archive</Button>
                                <Button variant="contained" color="error" onClick={e=>{}}><DeleteOutline/>Delete</Button>
                            </ButtonGroup>
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Grid>
              </Grid> */}
            </Box>
          </Collapse>
        </Card>
      </TableCell>
      </TableRow>
      </Fragment>
    )
}

