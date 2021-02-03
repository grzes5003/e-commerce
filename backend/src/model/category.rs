use serde::{Serialize, Deserialize};
use mysql::{Row, from_value};

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

    pub fn from_row(row: Row) -> Category {
        let row_ = row.unwrap();

        Category {
            id: from_value(row_[0].to_owned()),
            name: from_value(row_[1].to_owned())
        }
    }
}

impl From<(u8, String)> for Category {
    fn from(tuple: (u8, String)) -> Self {
        Category {
            id: tuple.0,
            name: tuple.1
        }
    }
}
