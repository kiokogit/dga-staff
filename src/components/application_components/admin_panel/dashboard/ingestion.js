import { Button, ButtonGroup, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
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

import { DeleteOutline, EditOutlined } from "@mui/icons-material"

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
        e.preventDefault()
        dispatch(set_loading(true, 'Processing...'))
        post_new_package(newpack)
            .then(res=>dispatch(post_short_alert_message({success:res.details})))
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
                    <TextField required variant="outlined" size="small" label="Final Destination: Country" value={newpack.package.country} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, country:e.target.value}})} />
                </div>
                <div className="textfield space_fields">
                    <TextField required variant="outlined" size="small" label="Final Destination: City/Town" value={newpack.package.city_town} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, city_town:e.target.value}})} />
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
                    <TextField required variant="outlined" size="small" multiline={true} rows={4} label="Itinerary" value={newpack.package.package_particulars} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, package_particulars:e.target.value}})} />
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
                        setNewpack({...newpack, price:[...newpack.price, price]})
                        setPrice({...price, type:"", amount:""})

                    }}
                    
                    >Add</Button>
                </Paper>
                <div className="textfield">
                    <TextField variant="outlined" size="small" required multiline={true} rows={4} label="Price includes" value={newpack.package.requirements} fullWidth onChange={e=>setNewpack({...newpack, package:{...newpack.package, requirements:e.target.value}})} />
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
                        <TextField variant="outlined" size="small" label="Image Description" value={addImg.name} fullWidth onChange={e=>setAddImg({...addImg, description:e.target.value})} />
                    </div>
                    <Button variant="outlined" color="success" size="small" value={"Add Image"} onClick={e=>{
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
    const dispatch = useDispatch()
    const [page, set_page] = useState(0)
    const [action, set_action] = useState(0)

    useEffect(()=>{
        get_all_packages_all(page+1).then(res=>setPackages(res))
    }, [page, action])

    const handleChangePage = (event, value) => {
		window.scrollTo({top: document.getElementById("packages").offsetTop - 79, behavior:'smooth'})
		set_page(value);
	};

    const removePackage = (id) => {
    }

    const activateDeactivatePackage = (id) => {
        dispatch(set_loading(true, "Processing Request..."))
        activate_package(id)
            .then(res=>dispatch(post_short_alert_message({success:res.details})))
            .catch(e=>dispatch(post_short_alert_message({error:e.message})))
            .finally(()=>{
                dispatch(set_loading(false, ""))
                set_action(action+1)
            })

    }

    // detail view
    const [openDetail, setOpenDetail] = useState(false)
	const [selected, setSelected] = useState({"title":""})

    const handleCloseDetail = () => {
        setOpenDetail(false)
    }

    const handleOpenDetail = (e, pack, mod) => {
        e.preventDefault()
        setSelected(pack)
        setOpenDetail(true)
        // set_mode(mod)
    }

    const [sort_dir, set_dir] = useState(true)
    const handleSortStatus= (e) => {
        let sortedpackages = packages.data.sort(
            (p1, p2) => (p1.is_active) ? (sort_dir ? 1:-1) : (!p1.is_active) ? (sort_dir? -1:1) : 0);
            setPackages({...packages, data:sortedpackages})
            set_dir(!sort_dir)
    }

    // const [mode, set_mode] = useState("view")

    return (
        <div className="margin_around" id="packages">
            <Typography variant="h6">Packages List</Typography>
            <FormHelperText><small>Deletion is not reversible</small></FormHelperText>
            <Paper>
            <Table>
                <TableHead>
                    <TableCell>Image</TableCell>
                    <TableCell>Reference Number </TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status  <TableSortLabel 
                        // active={true}
                        onClick={(e)=>handleSortStatus(e)}
                        direction={sort_dir ? "asc":"desc"}>
                            </TableSortLabel></TableCell>
                    <TableCell>Actions</TableCell>
                </TableHead>
                <TableBody>
                {packages.data.map(p=>
                    <TableRow hover={true}>
                        <TableCell width={"50px"}>
                            <img alt="" src={p.cover_image} style={{width:"50px", height:"50px"}} />
                        </TableCell>
                        <TableCell>
                            {p.reference_number}
                        </TableCell>
                        <TableCell>
                            {p.title}
                        </TableCell>
                        <TableCell>
                            <>{p.description.slice(0, 70)}</>...
                        </TableCell>
                        <TableCell>
                            {p.is_active? "Active":"Inactive"}
                            {p.is_active?  
                                <Button variant="outlined" color="warning" onClick={e=>activateDeactivatePackage(p.package_id)}>Deactivate</Button>:
                                <Button variant="contained" color="warning" onClick={e=>activateDeactivatePackage(p.package_id)}>Activate</Button>
                            }
                        </TableCell>
                        <TableCell>
                            <ButtonGroup size="small">
                                <Button variant="contained" color="success" onClick={e=>handleOpenDetail(e, p, "view")}>View</Button>
                                <Button variant="outlined" color="success" onClick={e=>handleOpenDetail(e, p, "edit")}><EditOutlined/></Button>
                                
                                <Button variant="contained" color="error" onClick={e=>removePackage(p.package_id)}><DeleteOutline /></Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TablePagination page={page} rowsPerPage={packages.data.length} rowsPerPageOptions={[packages.data.length]} count={packages.count} onPageChange={handleChangePage}/>
                </TableFooter>
            </Table>
			<DetailViewDialog pack={selected} open={openDetail} handleClose={handleCloseDetail} />
            </Paper>
        </div>
    )
}


export function DetailViewDialog({pack, open, handleSubmitInquiry, handleClose, mode}) {
    const descriptionElementRef = useRef(null);
    const dispatch = useDispatch()
    const [package_detail, setPackageDetail] = useState({})
  
    useEffect(() => {
        if (open) {
            get_package_detail_view(pack.package_id)
              .then(res=>setPackageDetail(res))
              .catch(e=>{
                  dispatch(post_short_alert_message({error:e.message}))
                  handleClose()
              })
              .finally(()=>{})
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      } else{
          setPackageDetail({})
      }
    }, [open, dispatch, pack]);
  
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
        >
          <DialogTitle id="scroll-dialog-title">{package_detail.title}</DialogTitle>
          
          <DialogContent dividers={true}>
            <CardMedia component={'img'} className="media_clear" loading="lazy" alt="" image={package_detail.cover_image} />
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <CardContent>{package_detail.description}</CardContent>
              {/* <NewPackAdd mode={mode} pack={{...editing_pack, package:package_detail, tags:package_detail.tags, images:package_detail.images, price:package_detail.cost}} /> */}
            </DialogContentText>
            {/* <h3> Gallery</h3>
            <ImageList sx={{ width: 500, height: 450 }} variant="quilted">
              <ImageListItem key="Subheader" cols={2}>
                  <ListSubheader component="div">Possible sights</ListSubheader>
              </ImageListItem>
              {package_detail.images?.map((item) => (
                  <ImageListItem key={item.image}>
                  <img
                      src={`${item.image}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.image}`}
                      alt={item.description}
                      loading="lazy"
                  />
                  <ImageListItemBar
                      title={item.description}
                  />
                  </ImageListItem>
              ))}
              </ImageList> */}
          </DialogContent>
          <DialogActions>
            <Button color="info" onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  
  
  
