use std::cmp::Ordering;

pub trait CmpPrice {
    fn cmp(&self, other: &Self) -> Ordering;
    fn partial_cmp(&self, other: &Self) -> Option<Ordering>;
    fn eq(&self, other: &Self) -> bool;
}

pub trait CmpName {
    fn cmp(&self, other: &Self) -> Ordering;
    fn partial_cmp(&self, other: &Self) -> Option<Ordering>;
    fn eq(&self, other: &Self) -> bool;
}
