use serde::{Serialize, Deserialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Category {
    pub id: u8,
    pub name: String,
}

impl Category {
    pub fn new(id: u8, name: String) -> Category {
        Category {
            id,
            name,
        }
    }
}
