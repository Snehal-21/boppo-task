import Product from "../models/product.js";
import Category from "../models/category.js"

const addSlug = async (name) => {
    console.log("function called")
    const checkProduct = await Product.findOne({ name }).exec();
    let slugname;
    if (!checkProduct) {
        const newName = name.split(' ').join('-')
        console.log(newName, "name")
        return newName
    } else {
        const check = await Product.find({ name }).exec();
        const slugs = check[check.length - 1].slug
        console.log(slugs, "==")
        const newName = slugs.split('-')
        let version = 1;
        console.log(newName, "name")
        if (newName[2] == undefined) {
            slugname = name.split(' ').join('-') + -version
        } else {
            version = parseInt(newName[2]) + 1;
            slugname = name.split(' ').join('-') + -version
        }
        console.log(slugname, "conname")
        return slugname;

    }
}

//Api to add Product
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const checkCategory = await Category.findOne({ name: category }).exec();
        const slug = await addSlug(name);
        console.log(slug, "slug")

        const newProduct = new Product({
            name,
            price,
            description,
            categoryId: checkCategory._id,
            slug: slug
        });
        await newProduct.save();
        return res.status(201).json({ status: 201, success: true, message: "Product added successfully." })
    } catch (error) {
        return res.status(500).json({ staus: 500, success: false, message: "Internal server error", error: error.message });
    }
}

//api to get single product
export const getByHandle = async (req, res) => {
    try {
        const { id } = req.params;
        const checkProduct = await Product.findOne({ _id: id }).exec();
        if (!checkProduct) {
            return res.status(400).json({ status: 400, success: false, message: "Product not found" })
        } else {
            return res.status(200).json({ status: 200, success: true, message: "product fetched successfully", data: checkProduct })
        }
    } catch (error) {
        return res.status(500).json({ staus: 500, success: false, message: "Internal server error", error: error.message });
    }
}

//api to update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;
        let categoryId;
        let slug;
        const checkProduct = await Product.findOne({ _id: id }).exec();
        if (!checkProduct) {
            return res.status(400).json({ status: 400, success: false, message: "Product not found" })
        } else {
            if (category) {
                const checkCategory = await Category.findOne({ name: category }).exec();
                categoryId = checkCategory._id
            }
            if (name === checkProduct.name) {
                slug = await addSlug(name)
            }
            console.log(slug, categoryId, "fslug")
            const updateData = await Product.findOneAndUpdate({ _id: id }, {
                name,
                price,
                description,
                categoryId,
                slug
            });
            console.log(updateData, "update")
            return res.status(200).json({ status: 200, success: true, message: "product fetched successfully", data: checkProduct })
        }
    } catch (error) {
        return res.status(500).json({ staus: 500, success: false, message: "Internal server error", error: error.message });
    }
}

//api to delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const checkProduct = await Product.findOne({ _id: id }).exec();
        if (!checkProduct) {
            return res.status(400).json({ status: 400, success: false, message: "Product not found" })
        } else {
            const deleteProduct = await Product.findOneAndDelete({ _id: id }).exec();
            if (deleteProduct) {
                return res.status(200).json({ status: 200, success: true, message: "product deleted successfully" })
            } else {
                return res.status(200).json({ status: 400, success: false, message: "Something went wrong,Please try again" })
            }

        }
    } catch (error) {
        return res.status(500).json({ staus: 500, success: false, message: "Internal server error", error: error.message });
    }
}

//api to get product
export const get = async (req, res) => {
    try {
        const { page, limit, category, filter } = req.body;
        let newResponse;
        if (page && limit) {
            let response = await Product.find({})
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            const count = await Product.countDocuments()
            if (response) {
                return res.status(200).json({ status: 200, success: true, message: "Products fetched successfully.", total: count, page_data: response.length, data: response })
            } else {
                return res.status(200).json({ status: 400, success: false, message: "Something went wrong,Please try again" })
            }
        } else if (category == true) {
            let response = await Product.find({})
                .exec();
            const categorynameData = response.map(async (x) => {
                const categoryName = await Category.findOne({ _id: x.categoryId }).exec();
                const name = categoryName.name

                newResponse = { x, name }
                return res.status(200).json({ success: true, status: 200, message: "Category data", data: newResponse })

            })
        }
        else if (filter) {
            console.log(filter)
            const productList = await Product.find({}).exec();
            const data = productList.filter(item => item.price <= filter.price);
            return res.status(200).json({ success: true, status: 200, message: "filtered data data", data: data })
        }
    } catch (error) {
        console.log("data")
        return res.status(500).json({ staus: 500, success: false, message: "Internal server error", error: error.message });
    }
}

//api to create many products
export const createMany = async (req, res) => {
    try {
        const { products } = req.body;

        products.map(async (product) => {
            const category = product.category
            const name = product.name
            const price = product.price
            const description = product.description
            console.log(category, name, price, description, "checks")
            const checkCategory = await Category.findOne({ name: category }).exec();
            console.log(checkCategory)
            const checkProduct = await Product.findOne({ name }).exec();
            let slugname;
            if (!checkProduct) {
                slugname = `${name}`
            } else {
                slugname = `${name}-1`
            }
            const newProduct = new Product({
                name,
                price,
                description,
                categoryId: checkCategory._id,
                slug: slugname
            });
            await newProduct.save();
        });
        return res.status(201).json({ status: 201, success: true, message: "Products added successfully." })


    } catch (error) {
        return res.status(500).json({ staus: 500, success: false, message: "Internal server error", error: error.message });
    }
}



