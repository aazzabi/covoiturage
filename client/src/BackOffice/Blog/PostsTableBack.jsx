import React from "react";
import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Progress,
    Table,
    UncontrolledTooltip, Button
} from "reactstrap";


const PostsTableBack = ({posts, currentPage, pageSize}) => {
    const currentPackages = posts.slice((currentPage - 1) * pageSize, pageSize * currentPage);
    const serverUrl = "http://127.0.0.1:8887/";

    return (<>

            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Categories</th>
                    <th scope="col">time</th>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {!!posts &&
                currentPackages.map(post =>

                    <tr key={post._id}>
                        <th scope="row">
                            <Media className="align-items-center">
                                <a
                                    className="avatar rounded-circle mr-3"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <img
                                        alt="..."
                                        src={`${serverUrl}${post.files}`}
                                    />
                                </a>
                                <Media>
                    <span className="mb-0 text-sm">
                        {post.title}
                    </span>
                                </Media>
                            </Media>
                        </th>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning"/>
                                {post.categories}
                            </Badge>
                        </td>
                        <td>{post.time}</td>

                        <td className="text-right">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={e => e.preventDefault()}
                                >
                                    <i className="fas fa-ellipsis-v"/>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => this.deleteHandler(e, post._id)}
                                    >
                                        Delete
                                    </DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    )
}
export default PostsTableBack;


