import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, StyledBadge } from "@mui/material";
import Badge from 'react-bootstrap/Badge';


export class NewsItem extends Component {

    
    render() {
    //   const styles = {
    //       main: {
    //         width: "max-content",
    //         height: 32,
    //         background: "#ed2828",
    //         borderradius: 0,
    //         border: "solid",
    //         bordercolor: "darksalmon"
    //       },
    //     };
    let { description, imageUrl, newsUrl, author, publishedAt } = this.props;
    return (
        
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {this.props.title}
                    {/* <Badge className="Gooo" color="secondary" badgeContent={this.props.source}>   
                    </Badge> */}
                      {/* <StyledBadge badgeContent={4} color="secondary">
                      </StyledBadge> */}
                     {/* <span class="badge badge-secondary">New</span>  */}
                    </Typography>
                     <Badge bg="danger" style={{border: "solid", bordercolor: "darksalmon"}}>{this.props.source}</Badge>
                    <Typography variant="body2" color="text.secondary">
                    {description}
                    </Typography>
                </CardContent>
                <div className="container" style={{ marginLeft: -8 }}>
                    <p rel="card-text">
                    <small className="" style={{color: "darkcyan"}}>
                        By {author} on {new Date(publishedAt).toGMTString()}
                    </small>
                    </p>
                </div>
                </CardActionArea>
                <CardActions>
                <Button
                    size="small"
                    color="primary"
                    style={{ background: " #121212" }}
                    >
                    <a
                    href={newsUrl}
                    style={{ textDecoration: "none" }}
                    target="__blank"
                    >
                    Read
                    </a>
                </Button>
                </CardActions>
            </Card>
        
    );
  }
}

export default NewsItem;
