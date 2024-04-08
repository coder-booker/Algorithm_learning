#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> res = {1, 2, 3};
    // vector<int>::iterator i = res.end()-1;
    // vector<int>::iterator b = res.begin()-1;
    // b = i;
    for ( auto i: res) {
        cout << i << endl;
    }
    
    return 0;
}